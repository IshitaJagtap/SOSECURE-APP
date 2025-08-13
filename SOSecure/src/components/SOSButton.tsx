import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useThemedColors} from '../utils/theme';

type Props = { onPress: () => void };

export default function SOSButton({onPress}: Props) {
  const theme = useThemedColors();
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={[styles.button, {backgroundColor: theme.primary}]}> 
        <Text style={styles.text}>SOS</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  button: { width: 180, height: 180, borderRadius: 90, alignItems: 'center', justifyContent: 'center', elevation: 8 },
  text: { color: 'white', fontSize: 44, fontWeight: '800', letterSpacing: 4 },
});