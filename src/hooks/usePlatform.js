import { Platform } from "react-native";

export const usePlatform = () => {
  const platform =
    Platform.OS === "android"
      ? "android"
      : Platform.OS === "ios"
        ? "ios"
        : "web";
  const isAndroid = platform === "android";
  const isIos = platform === "ios";
  const isWeb = platform === "web";
  return {
    platform,
    isAndroid,
    isIos,
    isWeb,
  };
};
