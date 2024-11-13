
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import SpeedLevel from './SpeedLevel';
import useVpn from '@/hooks/useVpn';
import { VpnServer } from '@/api/vpn-server.api';
import { router } from 'expo-router';



interface ServerListItemProps {
  server: VpnServer;
  size?: number;
}

const ServerListItem: React.FC<ServerListItemProps> = ({ server, size = 16 }) => {
  const { country, flag, speed } = server;
  const {setSelectedServer, disconnect, connectSelectedServer} = useVpn()

  const handleSelectServer = () => {
    disconnect()
    setSelectedServer(server);
    connectSelectedServer(server)
    router.push("/content/(tabs)")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectServer}>
      <CountryFlag isoCode={flag} size={size} />
      <View style={styles.info}>
        <Text style={styles.country}>{country}</Text>
        {/* <Text style={styles.address}>{address}</Text> */}
      </View>
      <SpeedLevel speed={speed} maxSpeed={5} size={16}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#192948',
    borderRadius: 8,
    marginBottom: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  country: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    color: '#A9A9A9',
    fontSize: 12,
  },
  speedContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  speedBar: {
    width: 4,
    height: 10,
    marginHorizontal: 2,
    backgroundColor: '#444',
    borderRadius: 2,
  },
  activeBar: {
    backgroundColor: '#00FF00',
  },
});

export default ServerListItem;
