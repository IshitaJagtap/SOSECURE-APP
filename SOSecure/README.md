# SOSecure (Android, React Native CLI)

Phase 1 demo-ready SOS app with:
- SOS button that sends SMS with live location to saved contacts
- Manage emergency contacts (local storage)
- Live map + share my location
- Background location (basic, via background-fetch)
- Violence detection camera mode (placeholder TFLite)

## Requirements
- Node 18+
- Java 17
- Android SDK & Android Studio

## Setup
```bash
cd SOSecure
# Install deps
yarn
# Android assets (vector icons)
npx react-native-asset
```

Android: Set Google Maps API key in `android/app/src/main/AndroidManifest.xml` under `com.google.android.geo.API_KEY`.

## Run (Debug)
```bash
# Start packager
yarn start
# In another terminal, with an emulator/device connected
yarn android
```

## Build APK (Release)
```bash
cd android
./gradlew assembleRelease
```
Pick up APK at `android/app/build/outputs/apk/release/app-release.apk`.

## Permissions
App requests: Location (foreground + background), SMS, Camera.

## Violence model
Place a `violence-detection.tflite` at `src/assets/models/violence-detection.tflite` (optional for demo). Metro is configured to bundle `.tflite`.

## Structure
```
src/
  components/
  screens/
  services/
  utils/
  assets/
```

## Notes
- SMS uses a small native module `SmsModule` to send programmatically.
- Background location demo uses `react-native-background-fetch` (free). For production-grade tracking, integrate a licensed background geolocation SDK.
- A sample contact is preloaded on first run.
