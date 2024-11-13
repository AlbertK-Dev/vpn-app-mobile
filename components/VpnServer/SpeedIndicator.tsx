import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


interface SpeedIndicatorProps {
  downloadSpeed: number;
  uploadSpeed: number;
}

const SpeedIndicator = ({ uploadSpeed, downloadSpeed }:SpeedIndicatorProps) => {
  return (
    
    <View style={styles.container}>
      <View style={styles.speedBox}>
        <Ionicons name="arrow-up-outline" size={16} color={uploadSpeed < 1?"red":'green'} />
        <Text style={styles.speedText}>{`${uploadSpeed} MB/S`}</Text>
      </View>
      <View style={styles.speedBox}>
      <Ionicons name="arrow-down-outline" size={16} color={downloadSpeed < 1?"red":'red'} />
        <Text style={styles.speedText}>{`${downloadSpeed} KB/S`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom:60,
    justifyContent: 'center',
    gap:50,
    width: 'auto',
  },
  speedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#192948',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    minWidth:90,
  },
  speedText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
    fontFamily:'Poppins.400'
  },
});

export default SpeedIndicator;
