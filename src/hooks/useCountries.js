import countries from "../assets/countries.json";
import uuid from 'react-native-uuid';

export default useCountries = function(){
    
    const getList = () => {

        return countries.map((country, index) => {
            return {
                id: uuid.v4(),
                title: country.label_en,
                value: country.label_en,
                iso_code: country.iso2_code
            }
        });
    }

    return {
        getList  
    }
}