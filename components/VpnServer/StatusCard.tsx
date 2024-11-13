import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ConnectionStatus from './ConnexionStatus';
import SpeedIndicator from './SpeedIndicator';

interface StatusCardProps {
  location?: string;
  isConnected: boolean;
  onToggleConnection: () => void;
  isLoading?:boolean
  
}

const StatusCard: React.FC<StatusCardProps> = ({ location="N/A", isConnected, onToggleConnection, isLoading=false}) => {
  return (
    <View style={{marginTop:70}}>
         <ConnectionStatus onPress={onToggleConnection} isConnected={isConnected} location={location} isLoading={isLoading}/>
         
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#001336',
    borderRadius: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00264D',
    padding: 20,
    borderRadius: 1000,
    height:200,
    width:200,
    justifyContent:"center",
    alignItems:"center",
    marginBottom: 10,
  },
  powerText: {
    color: '#00ADEF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationText: {
    color: '#B0C4DE',
    marginVertical: 8,
  },

});

export default StatusCard;
