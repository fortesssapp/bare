import { create } from "apisauce";
import getSettings from "../config/settings";

const settings = getSettings();

const apiClient = create({
    baseURL: settings.baseUrl
});

apiClient.addAsyncRequestTransform(async (request) => {
    // const authToken = await authStorage.getToken();
    // if(!authToken) return;
    // request.headers["x-auth-token"] = authToken;
} );


export default apiClient;