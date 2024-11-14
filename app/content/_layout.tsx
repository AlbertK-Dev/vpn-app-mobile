// app/content/_layout.tsx
import { Stack, router } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export default function ContentLayout() {
  const colorScheme = useColorScheme();
  const [isConnected, setIsConnected] = useState<boolean>(true);

  
  useEffect(() => {
    const checkInitialConnection = async () => {
      const netInfo = await NetInfo.fetch();
      setIsConnected(netInfo.isConnected ?? true);
      if (!netInfo.isConnected) {
        router.replace('/content/offline'); 
      }
    };

    checkInitialConnection();

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? true);
      if (!state.isConnected) {
        router.replace('/content/offline');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown:false}}>
       
        {isConnected ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="offline" options={{ headerShown: false }} />
        )}
      </Stack>
    </ThemeProvider>
  );
}
