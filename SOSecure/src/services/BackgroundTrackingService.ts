import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

let isRunning = false;

const task = async (taskData: {intervalMs: number}) => {
  const {intervalMs} = taskData;
  isRunning = true;
  while (isRunning) {
    Geolocation.getCurrentPosition(() => {}, () => {}, {enableHighAccuracy: true, timeout: 10000});
    await sleep(intervalMs);
  }
};

const options = {
  taskName: 'SOSecure Tracking',
  taskTitle: 'SOSecure is tracking location',
  taskDesc: 'For emergency SOS readiness',
  taskIcon: {name: 'ic_launcher', type: 'mipmap'},
  color: '#E53935',
  parameters: {intervalMs: 15000},
  linkingURI: 'sosecure://home',
};

export async function startBackgroundTracking() {
  if (BackgroundService.isRunning()) return;
  await BackgroundService.start(task, options as any);
}

export async function stopBackgroundTracking() {
  isRunning = false;
  if (BackgroundService.isRunning()) await BackgroundService.stop();
}