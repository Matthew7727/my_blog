import axios from 'axios';

export interface IpLocationResponse {
    ip: string,
    city: string,
    region: string,
    country: string,
}

const emptyLocation: IpLocationResponse = {
    ip: '',
    city: '',
    region: '',
    country: '',
  };

export const getUserLocation = async () => {
  try {
    const response = await axios.get<IpLocationResponse>('https://ipinfo.io/json?token=' + import.meta.env.VITE_IP_API_TOKEN);

    const locationData: IpLocationResponse = {
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.region,
        country: response.data.country
    }

    return locationData
    
  } catch (error) {
    console.error("Error fetching user location:", error);
    return emptyLocation;
  }
};

