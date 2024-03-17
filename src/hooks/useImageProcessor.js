import { useState, useContext } from "react";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import ImageEditor from '@react-native-community/image-editor';
import ImageEditor from '@react-native-community/image-editor';
import storage from '@react-native-firebase/storage';
import { General } from "../contexts/general";
import { User } from "../contexts/user";
import useConstants from "./useConstants";
import { Files } from "../models/Files";
import { Users } from "../models/Users";

export default function useImageProcessor(){
  const { showError, toggleLoader, showMessage } = useContext(General);
  const { auth, regData, info } = useContext(User);
  const constants = useConstants();
  const [selectedImages, setSelectedImages]   = useState([]);
  const [lowQualities, setLowQualities]       = useState([]);
  const [selectOptions, setSelectOptions]     = useState([
    {
      mediaType: "photo",
      isCamera: false,
      isProfile: true,
      maxSelection: 1,
      options: {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
        selectionLimit: 1
      }
    },
    {
      mediaType: "photo",
      isCamera: true,
      isProfile: true,
      maxSelection: 1,
      options: {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
        selectionLimit: 1,
        saveToPhotos: false,
        cameraType: "front"
      }
    },
    {
      mediaType: "photo",
      isCamera: false,
      isProfile: false,
      maxSelection: 6,
      options: {
        mediaType: "photo",
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 1,
        selectionLimit: 6,
        saveToPhotos: false
      }
    },
    {
      mediaType: "video",
      isCamera: false,
      isProfile: false,
      maxSelection: 1,
      options: {
        mediaType: "video",
        selectionLimit: 1,
        quality: 1,
        durationLimit: 60

      }
    }
  ]);

  // do image selection
  const doImageSelection = async (maxSelection = 1, isProfile = false, isCamera = false, type = "photo") => {
    // console.log(auth, " | ", regData, " | ", info, " | ", " auth, regData,  info");
    try {
      const options = selectOptions.find(option => (
        option.mediaType === type &&
        option.isCamera === isCamera &&
        option.isProfile === isProfile &&
        option.maxSelection === maxSelection
      ));

      if(!options) return showError(true, constants.errors.no_selection_option);
      const selectedResource = isCamera ? await launchCamera(options.options): await launchImageLibrary(options.options);
      if(selectedResource.didCancel) return showError(true, constants.errors.process_cancelled);
      if(selectedResource.errorCode) return showError(true, selectedResource.errorMessage);
      const assets = selectedResource.assets;
      if(assets.length === 0) return showError(true, constants.errors.empty_asset);
      assets.forEach(asset => { resizeAndCompress(asset, isProfile);});
    } catch (error) {
      console.log(error, "Resource selection error");
      showError(true, error?.message);
    }
  }
  // do processing

  const resizeAndCompress = async (asset, isProfile = false) => {
    try {

      const maxWidth    = isProfile? 300: 1200;
      const maxHeight   = isProfile? 300: 1200;
      const quality     = isProfile? 90: 80;
      const shadowQuality = 10;
      const format = "JPEG";

      toggleLoader(true, "resizing");

      const goodQuality = await ImageResizer.createResizedImage(
        asset.uri,
        maxWidth,
        maxHeight,
        format,
        quality
      );
      setSelectedImages([...selectedImages, {...goodQuality}]);
      
      const poorQuality = await ImageResizer.createResizedImage(
        asset.uri,
        maxWidth,
        maxHeight,
        format,
        shadowQuality
      );
      setLowQualities([...lowQualities, {...poorQuality}]);

      toggleLoader(false, "");

    } catch (error) {
      toggleLoader(false, "");
      console.log(error, " resizing error ");
      showError(true, error?.message);
    }
  }
  // crop Image
  const doImageCropping = async (uri, isProfile = false, cropData = {}) => {
    /*sample
    {
      offset: {x: number, y: number},
      size: {width: number, height: number},
      displaySize: {width: number, height: number},
      resizeMode: 'contain' | 'cover' | 'stretch',
      quality: number, // 0...1
      format: 'jpeg' | 'png' | 'webp' // web only
    }
    
    */
    try {
      const data = isProfile ? {
        offset: {x: 0, y: 0},
        size: {width: 300, height: 300},
        displaySize: {width: 250, height: 250},
        resizeMode: 'contain',
        quality: 1, // 0...1
        format: 'jpeg'
      }: cropData;

      const roppedUri = await ImageEditor.cropImage(uri, data);
      console.log(roppedUri, " cropped Image uri");

      // after cropping, change the image uri
      const current = selectedImages.find(image => image.uri === uri);

      if(!current) return;
      const cIndex = selectedImages.indexOf(current);
      const copy = selectedImages;
      current.uri = roppedUri;
      copy[cIndex] = current;
      setSelectedImages([...copy]);
      // set the image uri of the selected imag
      // 
    } catch (error) {
      console.log(error, "Inside foreach of looping upload");
      showError(true, error?.message);
    }
  }
  // do upload
  const removeImagesOnline = async () => {
    try {
      //await Users.updateUser({profile_image: null, profile_preview: null}, auth.id);

      selectedImages.forEach(async image => {
        if(image.uploaded){
          const found = await Files.findFile("uri", image.uri);
          if(found){
            console.log(found, " upload file listed");
          }
        }
      });

    } catch (error) {
      console.log(error, "Inside foreach of looping upload");
      showError(true, error?.message);
    }
  }
  const perfomUpload = async (isProfile = false, isImages = true) => {
    try {
      // Take images from the selected images array 
      toggleLoader(true, "Uploading...");
      // Array difference
      if(!isImages) return showError(true, constants.errors.no_file_selected);
       // do other file upload
      selectedImages.forEach( async (image, index) => {
        try {
          // upload to storage
          toggleLoader(true, "Uploading...");

          const findUser = await Users.findUser("phone", regData.phone);

          if(!findUser){
            toggleLoader(false, "Uploading...");
            return showError(true, constants.errors.user_not_found);
          }

          const uploadUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
          let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
          //console.log(filename, " name of file");
          const storageRef = storage().ref(`images/${filename}`);
          await storageRef.putFile(uploadUri);
          //console.log("215 we got here");
          const url = await storageRef.getDownloadURL();
          // profile preview
          //console.log(url, " 218 uploaded url");
          const preview = await convertToBlob(lowQualities[index]?.uri);
          //console.log("219 we got here", preview, url);

          if(isProfile){
            await Users.updateUser({profile_image: url, profile_preview: preview}, findUser.id);
            //console.log("224 update completed", updated);
            toggleLoader(false, "");
            showMessage(true, constants.upload_successful, null, null, "Okay", "Okay", false).then(success => {
              if(typeof success === "function"){
                setTimeout(() => success(), constants.auto_close_message_duration)
              }
            });
            const iO = {...image, user_id: findUser.id, preview, url: url, uploaded: true};

            const allImage    = selectedImages;
            allImage[index]   = iO;
            setSelectedImages([...allImage]);
            return;
          }
          // for main images
         
          const imageObject = {...image, user_id: auth.id, preview, url: url, chat_id: null, uploaded: true}
          await Files.createFile(imageObject);
          // add url to existing image
          const allImage    = selectedImages;
          allImage[index]   = imageObject;
          setSelectedImages([...allImage]);
          toggleLoader(false, "");
          // Sconsole.log("235 to the end ");

        } catch (error) {
          toggleLoader(false, "");
          console.log(error, "Inside foreach of looping upload error");
          showError(true, error?.message);
        }
      });

      // All Details

      return true;

    } catch (error) {
      console.log(error, " error updating files");
      showError(true, error?.message);
    }
  }

  const convertToBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.log(error, " error updating files");
      showError(true, error?.message);
    }
  }

  const removeImage = async (uri) => {
    setSelectedImages(selectedImages.filter((image) => image.uri !== uri));
    setLowQualities(lowQualities.filter((image) => image.uri !== uri));
    removeImagesOnline();
  };

  const clearImages = async () => {
    setSelectedImages([...[]]);
    setLowQualities([...[]]);
    removeImagesOnline();
  };

  return ({
    doImageSelection,
    doImageCropping,
    selectedImages,
    selectOptions,
    perfomUpload,
    removeImage,
    clearImages
  });
}