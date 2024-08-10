import axios from "axios";

interface EventData {
  type: string;
  description: string;
  coordinates: [number, number];
  address: {
    name: string;
    description: string;
  };
  userId: string;
  name: string;
  media: File[];
}

interface SearchAreaParams {
  searchCenter: [number, number];
  searchRadius: number;
}

interface plusEvent {
  eventId: string,
  userId: string,
}

const createEvent = async ({ type, description, coordinates, address, userId, name, media }: EventData) => {
  
  const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    formData.append('coordinates', JSON.stringify(coordinates));
    formData.append('address', JSON.stringify(address));
    formData.append('userId', userId);
    formData.append('name', name);
    media.forEach(file => {
      formData.append('media', file);
    });
  try {
    const response = await axios.post('http://5.35.44.198:5000/api/events/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const getAllEvents = async (): Promise<any[]> => {
  try {
    const response = await axios.get('http://5.35.44.198:5000/api/events/getAll');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const getEventsInArea = async ({ searchCenter, searchRadius }: SearchAreaParams): Promise<any[]> => {
  try {
    const response = await axios.get('http://5.35.44.198:5000/api/events/getInArea', { params: { searchCenter, searchRadius } });
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
};

const getEventById = async (id: string) => {
  try {
    const response = await axios.get('http://5.35.44.198:5000/api/events/getById', { params: {id}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const plusEvent = async ({ eventId, userId }: plusEvent) => {
  try {
    const response = await axios.post('http://5.35.44.198:5000/api/events/plus', {
      eventId,
      userId,
    })
    return (response.data)
  } catch (error) {
    console.error(error)
  }
}

const reportEvent = async ({ eventId, userId }: plusEvent) => {
  try {
    const response = await axios.post('http://5.35.44.198:5000/api/events/report', {
      eventId,
      userId,
    })
    return (response.data)
  } catch (error) {
    console.error(error)
  }
}

export default { createEvent, getAllEvents, getEventsInArea, getEventById, plusEvent, reportEvent };
