import {useEffect} from 'react';
import {startBackgroundTracking} from './services/BackgroundTrackingService';
import {requestBackgroundLocationPermission} from './services/Permissions';

export function useAppInit() {
  useEffect(() => {
    (async () => {
      await requestBackgroundLocationPermission();
      startBackgroundTracking();
    })();
  }, []);
}