import axios from "axios";

const createEvent = async ({ type, description, coordinates, address, userId }) => {
  try {
    const response = await axios.post('/api/events', {
      type,
      description,
      coordinates,
      address,
      userId
    });
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error);
  }
}

const getAllEvents = async () => {
  try {
    const response = await axios.get('/api/events')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export default { createEvent, getAllEvents };
