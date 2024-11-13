import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  isConnected: boolean;
  location: string;
  onPress: () => void;
  isLoading?: boolean;
};

const ConnectionStatus = ({ isConnected, location, onPress, isLoading = false }: Props) => {
  return (
    <View style={styles.container}>
      {/* Bouton image */}
      <TouchableOpacity onPress={onPress} style={styles.imageButton}>
        <Image
          source={require('../../assets/images/connect-image.png')} // Assurez-vous que le chemin est correct
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      {/* Statut de connexion */}
      {isLoading ? (
        <Text style={styles.statusText}>Connecting...</Text>
      ) : (
        <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
      )}

      {/* Localisation */}
      <Text style={styles.locationText}>
        Your Current Location: <Text style={styles.location}>{location}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonImage: {
    width: 130, 
    height: 130,
    resizeMode: 'contain', 
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    fontFamily: 'Poppins.400',
  },
  locationText: {
    color: '#a0a8b9',
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'Poppins.400',
  },
  location: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Poppins.500',
  },
});

export default ConnectionStatus;
