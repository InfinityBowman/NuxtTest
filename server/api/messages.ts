import { defineEventHandler } from 'h3';
import { getMessages, addMessage } from '../db/messages';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const method = event.method;

    if (method === 'GET') {
      return getMessages();
    }

    if (method === 'POST') {
      const body = await readBody(event);

      if (!body.name || !body.email || !body.message) {
        return { error: 'Name, email, and message are required fields' };
      }

      if (!body.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return { error: 'Invalid email format' };
      }

      return addMessage({
        name: body.name,
        email: body.email,
        message: body.message,
      });
    }

    return { error: 'Method not allowed' };
  } catch (error) {
    console.error('Error processing message:', error);
    return { error: 'Internal server error' };
  }
});
