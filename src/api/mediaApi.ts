import axios from "axios";
import { HOST } from "../utils";

const getMediaByEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`${HOST}/api/media/getByEvent`, { params: {eventId}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getMediaByEvent };
