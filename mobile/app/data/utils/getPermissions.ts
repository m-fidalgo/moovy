import { PermissionsAndroid, Platform } from "react-native";

export const getPermissions = async () => {
  if (Platform.OS === "android") {
    let granted = false;

    let permission = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    if (
      permission["android.permission.WRITE_EXTERNAL_STORAGE"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      permission["android.permission.READ_EXTERNAL_STORAGE"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      permission["android.permission.RECORD_AUDIO"] ===
        PermissionsAndroid.RESULTS.GRANTED
    )
      granted = true;
    else granted = false;

    return granted;
  } else return false;
};
