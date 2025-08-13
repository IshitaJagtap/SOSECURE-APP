import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useThemedColors} from '../utils/theme';

export default function ViolenceBanner({visible}: {visible: boolean}) {
  const theme = useThemedColors();
  if (!visible) return null;
  return (
    <View style={[styles.banner, {backgroundColor: theme.primary}]}> 
      <Text style={styles.text}>Violence detected! SOS will be triggered.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { position: 'absolute', bottom: 24, left: 16, right: 16, padding: 12, borderRadius: 8 },
  text: { color: 'white', fontWeight: '800', textAlign: 'center' },
});