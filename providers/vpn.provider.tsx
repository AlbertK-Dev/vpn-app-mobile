import React, { createContext, useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllVpnServers, VpnServer } from '@/api/vpn-server.api';

export interface VpnContextProps {
  servers: VpnServer[];
  fastestServers: VpnServer[];
  selectedServer: VpnServer | null;
  connectSelectedServer: (server: VpnServer) => void;
  disconnect: () => void;
  setSelectedServer: React.Dispatch<React.SetStateAction<VpnServer | null>>;
  recentsServers: VpnServer[];
  downloadSpeed: number;
  uploadSpeed: number;
  isConnected: boolean;
  toggleConnexion: () => void;
  loading: boolean;
  error: string | null;
  success: boolean;
  refreshServers: () => Promise<void>;
}

export const VpnContext = createContext<VpnContextProps | undefined>(undefined);

export const VpnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<VpnServer[]>([]);
  const [selectedServer, setSelectedServer] = useState<VpnServer | null>(null);
  const [recentsServers, setRecentsServers] = useState<VpnServer[]>([]);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const fetchServers = useCallback(async () => {
    try {
      const fetchedServers = await getAllVpnServers();
      setServers(fetchedServers);
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  }, []);

  const refreshServers = fetchServers; // Réutilisation de fetchServers pour la mise à jour

  useEffect(() => {
    fetchServers();
    const interval = setInterval(fetchServers, 10000);
    return () => clearInterval(interval);
  }, [fetchServers]);

  const fastestServers = servers
    .slice()
    .sort((a, b) => b.speed - a.speed)
    .slice(0, 2);

  useEffect(() => {
    if (fastestServers.length > 0 && !selectedServer) {
      setSelectedServer(fastestServers[0]);
    }
  }, [fastestServers, selectedServer]);

  const addToRecents = useCallback(async (server: VpnServer) => {
    const updatedRecents = [server, ...recentsServers.filter((s) => s._id !== server._id)].slice(0, 4);
    setRecentsServers(updatedRecents);
    try {
      await AsyncStorage.setItem('recentsServers', JSON.stringify(updatedRecents));
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  }, [recentsServers]);

  useEffect(() => {
    const loadRecents = async () => {
      try {
        const recents = await AsyncStorage.getItem('recentsServers');
        if (recents) setRecentsServers(JSON.parse(recents));
      } catch (error) {
        console.error('Error loading from AsyncStorage:', error);
      }
    };
    loadRecents();
  }, []);

  useEffect(() => {
    if (isConnected) {
      const speedInterval = setInterval(() => {
        setDownloadSpeed(Math.floor(Math.random() * 50) + 50);
        setUploadSpeed(Math.floor(Math.random() * 30) + 20);
      }, 1000);
      return () => clearInterval(speedInterval);
    } else {
      setDownloadSpeed(0);
      setUploadSpeed(0);
    }
  }, [isConnected]);

  const connectSelectedServer = async (server: VpnServer) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch(server.address, { method: 'HEAD', signal: controller.signal });
      if (!response.ok) throw new Error('Ping failed');

      setSelectedServer(server);
      setIsConnected(true);
      addToRecents(server);
      setSuccess(true);
    } catch (error: unknown) {
      if ((error as Error).name === 'AbortError') {
        console.log('Connection canceled');
      } else {
        setIsConnected(false);
        setError('Failed to connect to server');
        Alert.alert('Error', 'Failed to connect to server');
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setAbortController(null);
  };

  const toggleConnexion = async () => {
    if (loading && abortController) {
      abortController.abort();
      setLoading(false);
      setError(null);
      setSuccess(false);
      disconnect();
    }else if (loading){
      setLoading(false);
      setError(null);
      setSuccess(false);
      disconnect();
    } else if (isConnected) {
      disconnect();
    } else if (selectedServer) {
      await connectSelectedServer(selectedServer);
    }
  };

  return (
    <VpnContext.Provider
      value={{
        servers,
        fastestServers,
        selectedServer,
        connectSelectedServer,
        disconnect,
        setSelectedServer,
        recentsServers,
        downloadSpeed,
        uploadSpeed,
        isConnected,
        toggleConnexion,
        loading,
        error,
        success,
        refreshServers,
      }}
    >
      {children}
    </VpnContext.Provider>
  );
};
