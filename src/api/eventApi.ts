import axios from "axios";

interface EventData {
  type: string;
  description: string;
  coordinates: [number, number];
  address: {
    name: string;
    description: string;
  };
  userId: number;
  name: string
}

interface SearchAreaParams {
  searchCenter: [number, number];
  searchRadius: number;
}

const createEvent = async ({ type, description, coordinates, address, userId, name }: EventData) => {
  try {
    const response = await axios.post('/api/events', {
      type,
      description,
      coordinates,
      address,
      userId,
      name,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const getAllEvents = async (): Promise<any[]> => {
  try {
    const response = await axios.get('/api/events');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const getEventsInArea = async ({ searchCenter, searchRadius }: SearchAreaParams): Promise<any[]> => {
  try {
    const response = await axios.get('/api/events/area', { params: { searchCenter, searchRadius } });
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
};

export default { createEvent, getAllEvents, getEventsInArea };
