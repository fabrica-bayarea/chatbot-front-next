import { NextRequest, NextResponse } from 'next/server';
import { type ReactElement } from 'react';
import { Resend } from 'resend';

import { SupportUpdateEmail } from '@/components/EmailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const payload = {
      from: 'Chatbot IESB <chatbot@phlima.com>',
      to: [body.ownerProfile.email],
      subject: `Atualização de conversa (ID: ${body.id})`,
      react: SupportUpdateEmail(body) as ReactElement,
    };

    const data = await resend.emails.send(payload);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
