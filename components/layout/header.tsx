import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ButtonIcon from '../ButtonIcon';

interface HeaderProps {
  title: string;
  onLocationPress: () => void;
  isHomePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onLocationPress, isHomePage=true }) => {
  return (
    <View style={{...styles.container, justifyContent:isHomePage?"space-between":"flex-start", gap:10}}>
      {!isHomePage ? <ButtonIcon onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </ButtonIcon> : <ButtonIcon onPress={()=>null}>
        <Ionicons name="menu" size={24} color="#fff" />
      </ButtonIcon> }
      <Text style={styles.title}>{title}</Text>
      {isHomePage && <ButtonIcon onPress={onLocationPress}>
        <Ionicons name="location-outline" size={24} color="#fff" />
      </ButtonIcon>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#001336',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
