// screens/ServerSelectionScreen.tsx
import Header from '@/components/layout/header';
import Page from '@/components/Page';
import ServerListItem from '@/components/VpnServer/ServerListItem';
import ServerSection from '@/components/VpnServer/ServerSection';
import UpgradeBanner from '@/components/VpnServer/UpgradeBanner';
import useVpn from '@/hooks/useVpn';
import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';


const ServerSelectionScreen: React.FC = () => {
  const {servers, fastestServers} = useVpn()
  return (
    <Page>  
        <View style={{ flex: 1, backgroundColor: '#001336' }}>
      <Header title="Select Server" isHomePage={false} onLocationPress={() => alert('Already on Server Selection Screen')} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
      {fastestServers.length > 0 && <ServerSection title="Fastest Servers">
          {fastestServers.map((server, index) => (
            <ServerListItem key={index} server={server} />
          ))}
        </ServerSection>}
      <UpgradeBanner />
        {servers.length > 0 && <ServerSection title="Available Servers">
            {servers.map((server, index) => (
            <ServerListItem key={index} server={server} />
          ))}

        </ServerSection>}
      </ScrollView>
    </View>
    </Page>
  
  );
};

export default ServerSelectionScreen;
