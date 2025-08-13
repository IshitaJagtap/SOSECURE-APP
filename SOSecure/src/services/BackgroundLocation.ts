import BackgroundFetch from 'react-native-background-fetch';
import Geolocation from 'react-native-geolocation-service';

export async function configureBackgroundFetch(onLocation: (lat: number, lon: number) => void) {
  await BackgroundFetch.configure(
    {minimumFetchInterval: 15, stopOnTerminate: false, startOnBoot: true, enableHeadless: true},
    async taskId => {
      Geolocation.getCurrentPosition(
        pos => onLocation(pos.coords.latitude, pos.coords.longitude),
        () => {},
        {enableHighAccuracy: true, timeout: 10000},
      );
      BackgroundFetch.finish(taskId);
    },
    async taskId => {
      BackgroundFetch.finish(taskId);
    },
  );
}