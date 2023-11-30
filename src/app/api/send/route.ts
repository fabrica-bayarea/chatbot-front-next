import { NextResponse } from 'next/server';
import { ReactElement } from 'react';
import { Resend } from 'resend';

import EmailTemplate from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const payload = {
      from: 'Chatbot <chatbot@phlima.com>',
      to: ['limapaulobsb@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }) as ReactElement,
    };

    const data = await resend.emails.send(payload);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
