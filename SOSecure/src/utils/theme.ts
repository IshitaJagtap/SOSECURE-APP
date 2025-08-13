import {useColorScheme} from 'react-native';

export const Colors = {
  red: '#E53935',
  redDark: '#B71C1C',
  bgLight: '#FFFFFF',
  bgDark: '#121212',
  textLight: '#000000',
  textDark: '#FFFFFF',
  gray: '#9E9E9E',
};

export function useThemedColors() {
  const isDark = useColorScheme() === 'dark';
  return {
    isDark,
    background: isDark ? Colors.bgDark : Colors.bgLight,
    text: isDark ? Colors.textDark : Colors.textLight,
    primary: Colors.red,
    primaryDark: Colors.redDark,
    card: isDark ? '#1E1E1E' : '#FAFAFA',
  };
}