import axios from "axios";

const getMediaByEvent = async (eventId: string) => {
  try {
    const response = await axios.get('http://v101242.hosted-by-vdsina.com:5000/api/media/getByEvent', { params: {eventId}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getMediaByEvent };
