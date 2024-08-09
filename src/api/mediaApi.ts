import axios from "axios";

const getMediaByEvent = async (eventId: string) => {
  try {
    const response = await axios.get('/api/media/getByEvent', { params: {eventId}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getMediaByEvent };
