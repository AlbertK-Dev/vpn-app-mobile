import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Page from '@/components/Page';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (isFirstLaunch === false) {
      router.replace('/content/(tabs)');
    }
  }, [isFirstLaunch]);



  return (
    <Page>
      <LinearGradient
        colors={['#000000', '#001336', '#001336']}
        style={styles.container}
      >
        <View style={styles.flagsContainer}>
          <Image
            source={require('../assets/images/flags.png')}
            style={styles.flagsImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to PARA VPN</Text>
          <Text style={styles.description}>
            PARA VPN is the fastest VPN in the world that provides you with more than 50 servers in countries all over the world
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.replace("/content/(tabs)")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagsContainer: {
    marginTop: 0,
  },
  flagsImage: {
    minWidth: width,
    height: height * 0.7,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Poppins.500',
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins.400',
  },
  button: {
    backgroundColor: '#6398ff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 40,
    minWidth: 343,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins.400',
  },
});
