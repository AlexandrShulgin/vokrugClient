import axios from "axios";

interface CommentData {
  authorId: string;
  eventId: string;
  text: string
}

const createComment = async ({ authorId, eventId, text }: CommentData) => {
  try {
    const response = await axios.post('/api/comments/create', {
      authorId,
      eventId,
      text
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const getCommentByEvent = async (eventId: string) => {
  try {
    const response = await axios.get('/api/comments/getByEvent', { params: {eventId}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { createComment, getCommentByEvent };
