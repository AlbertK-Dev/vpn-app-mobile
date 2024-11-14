import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

export default function ContentOfflineScreen() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Vérifier l'état de la connexion au lancement de la page
  useEffect(() => {
    const checkConnection = async () => {
      const netInfo = await NetInfo.fetch();
      setIsConnected(netInfo.isConnected ?? false);
    };

    // Vérifie l'état de la connexion à l'initialisation
    checkConnection();

    // Abonnement à l'événement de changement d'état de la connexion
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Nettoyer l'abonnement lors de la destruction du composant
    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    if (isConnected) {
      router.replace('/content/(tabs)'); // Rediriger vers (tabs) si connecté
    } else {
      alert("Pas de connexion. Veuillez vérifier votre connexion Internet.");
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={80} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.title}>Oops, connexion perdue !</Text>
      <Text style={styles.subtitle}>
        Vous semblez être hors ligne. Vérifiez votre connexion Internet et réessayez.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRetry} disabled={!isConnected}>
        <Text style={styles.buttonText}>{isConnected ? "Réessayer" : "Pas de connexion"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001336',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily:'Poppins.500'
  },
  subtitle: {
    fontSize: 16,
    color: '#A9B1BC',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
    fontFamily:'Poppins.400'
  },
  button: {
    backgroundColor: '#6398ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily:'Poppins.400'
   
  },
});
