'use server';

import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { getTranslations } from 'next-intl/server';

const transport = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function createMail(message: string): Mail.Options {
  return {
    from: process.env.EMAIL_USERNAME,
    to: process.env.EMAIL_USERNAME,
    subject: 'New message from portfolio-2024',
    text: message,
  };
}

async function validateEmailData(formData: FormData) {
  const t = await getTranslations('about.contact.messageStatus');
  const message = formData.get('message') as string;

  if (!message) {
    return { error: t('emptyMessage') };
  }

  return { success: true };
}

export async function sendEmail(formData: FormData) {
  const t = await getTranslations('about.contact.messageStatus');
  const validation = await validateEmailData(formData);

  if (!validation.success) {
    return { error: validation.error };
  }

  // send email
  const message = formData.get('message') as string;
  try {
    await transport.sendMail(createMail(message));
    return { success: true };
  } catch (error) {
    return { error: t('internal') };
  }
}
