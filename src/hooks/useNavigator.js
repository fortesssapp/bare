import { useNavigationState, useNavigation } from "@react-navigation/native";

export default function useNavigator() {
  const state = useNavigationState((state) => state);
  const currentRouteName = state.routes[state.index].name;
  const navigation = useNavigation();
  return {
    currentRouteName,
    navigation,
  };
}
