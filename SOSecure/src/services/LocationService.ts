import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid} from 'react-native';

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export async function getCurrentPosition(): Promise<GeoPosition | null> {
  const hasPerm = await requestLocationPermission();
  if (!hasPerm) return null;
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      () => resolve(null),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 5000},
    );
  });
}

export function buildGoogleMapsLink(lat: number, lon: number): string {
  return `https://maps.google.com/?q=${lat},${lon}`;
}