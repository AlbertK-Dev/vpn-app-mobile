// screens/HomeScreen.tsx
import Header from '@/components/layout/header';
import Page from '@/components/Page';
import ServerListItem from '@/components/VpnServer/ServerListItem';
import ServerSection from '@/components/VpnServer/ServerSection';
import SpeedIndicator from '@/components/VpnServer/SpeedIndicator';
import StatusCard from '@/components/VpnServer/StatusCard';
import useVpn from '@/hooks/useVpn';

import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';


const HomeScreen: React.FC = () => {

  const {recentsServers, downloadSpeed, uploadSpeed, isConnected, connectSelectedServer, disconnect, selectedServer, loading} = useVpn()

  const toggleConnection = () => {
    if (isConnected) {
      disconnect()
    }else{
     selectedServer && connectSelectedServer(selectedServer)
    }
  };

  return (
    <Page>
       <View style={{ flex: 1, backgroundColor: '#001336' }}>
      <Header title="PARA VPN" onLocationPress={() => router.push('/content/(tabs)/servers')} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <StatusCard
          location={selectedServer?.country}
          isConnected={isConnected}
          onToggleConnection={toggleConnection}
          isLoading={loading}
        />
        <SpeedIndicator downloadSpeed={downloadSpeed} uploadSpeed={uploadSpeed}/>
       
        {recentsServers.length!==0 && <ServerSection title="Your recents locations">
          {recentsServers.map((server, index) => (
            <ServerListItem key={index} server={server} />
          ))}
        </ServerSection>}
      </ScrollView>
    </View>
    </Page>
   
  );
};

export default HomeScreen;
