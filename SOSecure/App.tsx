/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './src/navigation';



import {useAppInit} from './src/AppInit';

function App(): React.JSX.Element {
  useAppInit();
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <View style={{flex: 1}}>
        {/* @ts-expect-error - default export of navigation */}
        <Navigation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
