export default function useReducers() {
  // registration reducer
  const registrationReducer = (state, payload) => {
    switch (payload.type) {
      case "country": {
        return { ...state, country: payload.value };
      }
      case "phone": {
        return { ...state, phone: payload.value };
      }
      case "about": {
        return { ...state, about: payload.value };
      }
      case "name": {
        return { ...state, name: payload.value };
      }
      case "nick_name": {
        return { ...state, nick_name: payload.value };
      }
      case "email": {
        return { ...state, email: payload.value };
      }
      case "ntoken": {
        return { ...state, ntoken: payload.value };
      }
      case "device_id": {
        return { ...state, device_id: payload.value };
      }
      case "pin": {
        return { ...state, pin: payload.value };
      }
      case "salt": {
        return { ...state, salt: payload.value };
      }
      case "uid": {
        return { ...state, uid: payload.value };
      }
      case "many": {
        return { ...state, ...payload.value };
      }
      default:
        return { ...state };
    }
  };

  return {
    registrationReducer,
  };
}
