'use client';

import { KeyboardEvent, useState } from 'react';
import { sendEmail } from '@/actions/email';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export default function ContactSection() {
  const t = useTranslations('about.contact');

  const [message, setMessage] = useState('');
  const placeholder = t('placeholder');
  const { toast } = useToast();

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab' && message === '') {
      e.preventDefault();
      setMessage(placeholder);
    }
  }

  async function onSendEmail(formData: FormData) {
    const result = await sendEmail(formData);

    if (result.error) {
      toast({
        title: t('messageStatus.error.title'),
        description: result.error,
        variant: 'destructive',
      });

      return;
    }

    setMessage('');
    toast({
      title: t('messageStatus.success.title'),
      description: t('messageStatus.success.description'),
    });
  }

  return (
    <>
      <h2 className="text-7xl font-semibold">{t('title')}</h2>
      <span className="block w-full h-0.5 bg-gray-500" />
      <form className="w-4/6" action={onSendEmail}>
        <p className="text-5xl font-light mb-12">{t('hello')}</p>
        <div className="relative">
          {message === '' && (
            <span className="absolute pt-1 pb-1 pl-2 pr-2 rounded border border-tertiary-text text-tertiary-text text-sm top-0 translate-y-[-110%]">
              Tab
            </span>
          )}

          <textarea
            name="message"
            rows={5}
            value={message}
            onKeyDown={onKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            className="text-3xl font-light bg-transparent appearance-none outline-none text-primary-text w-full"
            placeholder={placeholder}
          />
        </div>
        <Button type="submit" size="lg" className="text-lg 2xl:text-xl">
          Send message
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
      </form>
    </>
  );
}
