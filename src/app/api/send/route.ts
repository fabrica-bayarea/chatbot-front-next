import { NextRequest, NextResponse } from 'next/server';
import type { ReactElement } from 'react';
import { Resend } from 'resend';

import { SupportEmail } from '@/components/EmailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { collaboratorName, email, id, messages, name } = await req.json();

  try {
    const payload = {
      from: 'Chatbot <chatbot@phlima.com>',
      to: [email],
      subject: `Atualização de conversa (ID: ${id})`,
      react: SupportEmail({ collaboratorName, id, messages, name }) as ReactElement,
    };

    const data = await resend.emails.send(payload);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
