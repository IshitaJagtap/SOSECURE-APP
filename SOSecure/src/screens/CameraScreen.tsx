import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {requestCameraPermission} from '../services/Permissions';
import {useThemedColors} from '../utils/theme';

export default function CameraScreen() {
  const theme = useThemedColors();
  const devices = useCameraDevices();
  const device = devices.back ?? devices.front;
  const [authorized, setAuthorized] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const ok = await requestCameraPermission();
      setAuthorized(ok);
      if (!ok) Alert.alert('Camera permission required');
    })();
  }, []);

  useEffect(() => {
    // Placeholder: run inference periodically on camera frames in real implementation
  }, []);

  if (!device || !authorized) {
    return <View style={[styles.center, {backgroundColor: theme.background}]}><Text style={{color: theme.text}}>Loading camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={[styles.overlay, {backgroundColor: 'transparent'}]}> 
        <Text style={[styles.badge, {backgroundColor: theme.primary}]}>Monitoring</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlay: { position: 'absolute', top: 16, left: 16 },
  badge: { color: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, fontWeight: '700' },
});