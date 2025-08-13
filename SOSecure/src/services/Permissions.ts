import {PermissionsAndroid} from 'react-native';

export async function requestSmsPermission(): Promise<boolean> {
  const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS);
  return res === PermissionsAndroid.RESULTS.GRANTED;
}

export async function requestCameraPermission(): Promise<boolean> {
  const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  return res === PermissionsAndroid.RESULTS.GRANTED;
}

export async function requestBackgroundLocationPermission(): Promise<boolean> {
  const fine = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  const bg = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
  return fine === PermissionsAndroid.RESULTS.GRANTED && bg === PermissionsAndroid.RESULTS.GRANTED;
}