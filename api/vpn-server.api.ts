const BASE_URL = "https://vpn-app-backend.vercel.app";
const VPN_SERVER_URL = BASE_URL + "/vpn-server";

export interface VpnServer {
  _id?: string;
  country: string;
  address: string;
  speed: number; // Speed range from 1 to 5
  flag: string;  // ISO country code (e.g., 'FR' for France)
  createdAt?: string; // Date de création au format ISO
  updatedAt?: string; // Date de mise à jour au format ISO
}

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Get all VPN servers
export const getAllVpnServers = async (): Promise<VpnServer[]> => {
  const response = await fetch(`${VPN_SERVER_URL}`, {
    method: 'GET',
  });
  return handleResponse(response);
};

// Get a single VPN server by ID
export const getVpnServerById = async (id: string): Promise<VpnServer> => {
  const response = await fetch(`${VPN_SERVER_URL}/${id}`, {
    method: 'GET',
  });
  return handleResponse(response);
};

