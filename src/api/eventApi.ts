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
  name: string
}

interface SearchAreaParams {
  searchCenter: [number, number];
  searchRadius: number;
}

interface plusEvent {
  eventId: string,
  userId: string,
}

const createEvent = async ({ type, description, coordinates, address, userId, name }: EventData) => {
  try {
    const response = await axios.post('/api/events/create', {
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
    const response = await axios.get('/api/events/getAll');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const getEventsInArea = async ({ searchCenter, searchRadius }: SearchAreaParams): Promise<any[]> => {
  try {
    const response = await axios.get('/api/events/getInArea', { params: { searchCenter, searchRadius } });
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    return [];
  }
};

const getEventById = async (id: string) => {
  try {
    const response = await axios.get('/api/events/getById', { params: {id}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const plusEvent = async ({ eventId, userId }: plusEvent) => {
  try {
    const response = await axios.post('/api/events/plus', {
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
    const response = await axios.post('/api/events/report', {
      eventId,
      userId,
    })
    return (response.data)
  } catch (error) {
    console.error(error)
  }
}

export default { createEvent, getAllEvents, getEventsInArea, getEventById, plusEvent, reportEvent };
