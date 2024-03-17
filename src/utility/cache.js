import constants from "../config/constantsList.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(
      constants.cache_prefix + key,
      JSON.stringify(item),
    );
    return true;
  } catch (error) {
    return false;
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return now.diff(storedTime, constants.cached_in_text) > constants.cache_time;
};

const get = async (key, check_expiry = true) => {
  try {
    const value = await AsyncStorage.getItem(constants.cache_prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;
    if (isExpired(item) && check_expiry) {
      await AsyncStorage.removeItem(constants.cache_prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    return null;
  }
};

export {
  store,
  get,
};
