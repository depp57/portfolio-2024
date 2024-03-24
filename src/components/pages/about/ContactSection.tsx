'use client';

import { Button } from '@/components/shared/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { FormEvent, KeyboardEvent, useState } from 'react';

export default function ContactSection() {
  const [message, setMessage] = useState('');

  const placeholder =
    'Hello Sacha! We have an interesting project we would like to discuss with you. Reach us at our email address:';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // TODO: send email or SMS
  }

  function handleOnKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab' && message === '') {
      e.preventDefault();
      setMessage(placeholder);
    }
  }

  return (
    <form className="w-4/6" onSubmit={handleSubmit}>
      <p className="text-5xl font-light mb-12">Hi Sacha!</p>
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
          onKeyDown={handleOnKeyDown}
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
  );
}
