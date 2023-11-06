import { Platform } from "react-native";

const settings = {
    dev: {
        baseUrl: "http://127.0.0.1/"
    },
    prod: {
        baseUrl: "http://127.0.0.1/"
    }
}

const getSettings = () => {
    if(__DEV__) return settings.dev;
    return settings.prod;
}

export default getSettings;