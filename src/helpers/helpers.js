import { parsePhoneNumber } from "libphonenumber-js";

export const convertFirstLetter = (str = "") => {
    
    try {
        if(str.trim() === "") return str;
        return (str.trim().toLowerCase().split(" ").map(st => {
            return (st.trim().length)? st?.trim()?.[0].toUpperCase() + st?.trim().slice(1):"";
        })).filter(v => v.trim().length > 0).join(" ");

    } catch (error) {
       return ""; 
    }


};

export const getFullPhoneNumber = ( phone, code = "NG" ) => {
    try {
        // const get country code
        const checkedPhoneNumber = parsePhoneNumber(phone, code);
        if(checkedPhoneNumber.isValid()){
            return checkedPhoneNumber.number;
        }
        return false;

    } catch (error) {
        return false;
    }
  }