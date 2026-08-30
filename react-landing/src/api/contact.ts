import { apiPost } from './client';

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactResponse = {
  message: string;
};

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  return apiPost<ContactResponse>('/api/v1/contact/send', payload);
}
