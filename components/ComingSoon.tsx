import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Href, useRouter } from 'expo-router';

type ComingSoonProps = {
  title: string;
  description?: string;
  goto?:Href;
};

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description, goto }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}

      {/* Bouton stylé */}
      <TouchableOpacity style={styles.button} onPress={() => router.push(goto || '/content')}>
        <Text style={styles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001336', // Couleur de fond personnalisée
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', // Couleur du texte blanc
    textAlign: 'center', // Centrer le titre
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#d1d1d1', // Couleur légèrement grisée pour la description
    textAlign: 'center', // Centrer la description
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
   // backgroundColor: '#3498db', // Couleur du bouton
    backgroundColor: "#6398FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff', // Couleur du texte du bouton
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ComingSoon;
