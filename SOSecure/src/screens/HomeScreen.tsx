import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import SOSButton from '../components/SOSButton';
import {buildGoogleMapsLink, getCurrentPosition} from '../services/LocationService';
import {preloadSampleContact, getContacts} from '../services/ContactsService';
import {sendSmsDirect} from '../services/SmsService';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useThemedColors} from '../utils/theme';
import {requestSmsPermission} from '../services/Permissions';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Contacts: undefined;
  Camera: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const theme = useThemedColors();
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    preloadSampleContact();
    (async () => {
      const pos = await getCurrentPosition();
      if (pos) {
        const r: Region = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(r);
      }
    })();
  }, []);

  const map = useMemo(() => {
    if (!region) return null;
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker coordinate={region} />
      </MapView>
    );
  }, [region]);

  const onShareLocation = () => {
    if (!region) return;
    const link = buildGoogleMapsLink(region.latitude, region.longitude);
    Clipboard.setString(link);
    Alert.alert('Location link copied', link);
  };

  const onSOS = async () => {
    const contacts = await getContacts();
    if (!contacts.length) {
      Alert.alert('No contacts', 'Add emergency contacts first');
      return;
    }
    if (!(await requestSmsPermission())) {
      Alert.alert('Permission required', 'SMS permission is needed to send alerts');
      return;
    }
    const pos = await getCurrentPosition();
    if (!pos) {
      Alert.alert('Location unavailable', 'Could not get current location');
      return;
    }
    const link = buildGoogleMapsLink(pos.coords.latitude, pos.coords.longitude);
    const message = `SOS! I am in danger. My current location: ${link}`;
    for (const c of contacts) {
      try { await sendSmsDirect(c.phone, message); } catch {}
    }
    Alert.alert('SOS sent', `Sent to ${contacts.length} contact(s)`);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}> 
      {map}
      <View style={styles.centerArea}>
        <SOSButton onPress={onSOS} />
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.action} onTouchEnd={() => navigation.navigate('Contacts')}>
          <Icon name="account-multiple" size={28} color={theme.text} />
          <Text style={[styles.actionText, {color: theme.text}]}>Add Contacts</Text>
        </View>
        <View style={styles.action} onTouchEnd={() => navigation.navigate('Camera')}>
          <Icon name="video" size={28} color={theme.text} />
          <Text style={[styles.actionText, {color: theme.text}]}>Violence Detection</Text>
        </View>
        <View style={styles.action} onTouchEnd={onShareLocation}>
          <Icon name="share-variant" size={28} color={theme.text} />
          <Text style={[styles.actionText, {color: theme.text}]}>Share My Location</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  centerArea: { position: 'absolute', top: '40%', left: 0, right: 0, alignItems: 'center' },
  bottomBar: { position: 'absolute', bottom: 24, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  action: { alignItems: 'center' },
  actionText: { marginTop: 6, fontSize: 12 },
});