import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, ContactsScreen, CameraScreen} from './screens';

export type RootStackParamList = {
  Home: undefined;
  Contacts: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{title: 'Violence Detection'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}