import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ServerSectionProps {
  title: string;
  children: ReactNode;
}

const ServerSection: React.FC<ServerSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    color: '#B0C4DE',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ServerSection;
