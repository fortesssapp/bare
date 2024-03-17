import { parsePhoneNumber } from "libphonenumber-js";
import CryptoJS from "react-native-crypto-js";

export const convertFirstLetter = (str = "") => {
  try {
    if (str.trim() === "") return str;
    return str
      .trim()
      .toLowerCase()
      .split(" ")
      .map((st) => {
        return st.trim().length
          ? st?.trim()?.[0].toUpperCase() + st?.trim().slice(1)
          : "";
      })
      .filter((v) => v.trim().length > 0)
      .join(" ");
  } catch (error) {
    return "";
  }
};

export const getErrors = (...args) => {
  try {
    let error = "";
    args.forEach(arg => {
      if(typeof arg === "object"){
        // {valid: true, errors: ref}
        const validity = arg?.isValid();
        if(!validity){
          const er = arg?.getErrors();
          //console.log(er, " error ?");
          error += `, `+er;
        }
      }
    });
    return error;
  } catch (error) {
    return error.message;
  }
}

export const getFullPhoneNumber = (phone, code = "NG") => {
  try {
    // const get country code
    const checkedPhoneNumber = parsePhoneNumber(phone, code);
    if (checkedPhoneNumber.isValid()) {
      return checkedPhoneNumber.number;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const decryptEncripted = (cipher = "", salt = "") => {
  try {
    if(!(cipher && salt)) return false;
    return (CryptoJS.AES.decrypt(cipher, salt)).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    // console.log(error?.message);
    return false;
  }
}
