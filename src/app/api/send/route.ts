import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { EndOfSupportEmail, SupportUpdateEmail } from '@/components/EmailTemplates';

const templates = {
  'end-of-support': EndOfSupportEmail,
  'support-update': SupportUpdateEmail,
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const payload = {
      from: 'Chatbot IESB <chatbot@phlima.com>',
      to: [body.ownerProfile.email],
      subject: `Atualização de atendimento (ID: ${body.id})`,
      react: templates[body.template as 'end-of-support' | 'support-update'](body),
    };

    const data = await resend.emails.send(payload);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
