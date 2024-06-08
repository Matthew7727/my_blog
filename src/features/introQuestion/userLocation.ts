import axios from 'axios';

const IP_API_TOKEN = '0404669f62f4ae'

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
    const response = await axios.get<IpLocationResponse>('https://ipinfo.io/json?token=' + IP_API_TOKEN);

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

