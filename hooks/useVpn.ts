import { VpnContext, VpnContextProps } from '@/providers/vpn.provider';
import { useContext } from 'react';


const useVpn = (): VpnContextProps => {
  const context = useContext(VpnContext);

  if (!context) {
    throw new Error('useVpn must be used within a VpnProvider');
  }

  return context;
};

export default useVpn;
