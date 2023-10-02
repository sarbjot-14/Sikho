import axios from 'axios';

const client = axios.create({
  baseURL: 'https://geolocation-db.com/json/',
});

// Industry
export const getIPAddress = async () => {
  const response = await client.get('');
  return response.data.IPv4;
};
