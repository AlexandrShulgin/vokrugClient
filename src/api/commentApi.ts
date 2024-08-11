import axios from "axios";
import { HOST } from "../utils";

interface CommentData {
  authorId: string;
  eventId: string;
  text: string
  media?: File 
}

const createComment = async ({ authorId, eventId, text, media }: CommentData) => {
  
  const formData = new FormData();
    formData.append('authorId', authorId);
    formData.append('eventId', eventId);
    formData.append('text', text);
    if (media) {
      formData.append('media', media);
    }    
  try {
    const response = await axios.post(`${HOST}/api/comments/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const getCommentByEvent = async (eventId: string) => {
  try {
    const response = await axios.get(`${HOST}/api/comments/getByEvent`, { params: {eventId}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { createComment, getCommentByEvent };
