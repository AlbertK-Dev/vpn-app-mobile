import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { VpnProvider } from '@/providers/vpn.provider';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins.400":Poppins_400Regular,
    "Poppins.500":Poppins_500Medium
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  NavigationBar.setButtonStyleAsync("light");
  NavigationBar.setBackgroundColorAsync('#001336');
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("overlay-swipe")


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <VpnProvider>
        <StatusBar style='dark' backgroundColor='#001336'/>
           <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="content"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
      </VpnProvider>
 
  </ThemeProvider>
  );
}
