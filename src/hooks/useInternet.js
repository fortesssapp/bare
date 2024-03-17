import { useState, useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { General } from '../contexts/general';
import useConstants from './useConstants';

const useInternet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const { showError } = useContext(General);
  const { errors } = useConstants();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // Set isConnected based on the presence of internet connectivity
      setIsConnected(!!state.isConnected);
      // Assuming 'strong' connection means high speed, adjust as needed
      // This example treats WiFi or cellular connections with high download speed as strong
      const strongConnectionTypes = ['wifi', 'ethernet', 'unknown'];
      const strongSpeedThreshold = 5; // Minimum speed in Mbps for a connection to be considered strong
      const isConnectionStrong = strongConnectionTypes.includes(state.type) && state.isInternetReachable && state.details?.downlinkMax >= strongSpeedThreshold;
      // console.log(state.details?.downlinkMax, "internet speed");
      setIsStrong(isConnectionStrong);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);


  const checkInternet = () => {
    try {
      if(!isConnected){
        showError(true, errors.no_internet);
        return false;
      }
      return true;
    } catch (error) {
      showError(true, error?.message);
      return false;
    }
  }

  return { isConnected, isStrong, checkInternet };
};

export default useInternet;