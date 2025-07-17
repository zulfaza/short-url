'use client';
import { createShortUrl, State } from '@/app/actions';
import React, { useActionState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

const InputUrl = () => {
  const [state, formAction, pending] = useActionState(createShortUrl, {
    success: false,
    error: '',
  } as State);
  return (
    <>
      <form action={formAction} className='w-full'>
        <div className='mb-2'>
          <Label className='mb-2' htmlFor='url'>
            Long URL
          </Label>
          <Input
            name='url'
            className='w-full'
            id='url'
            type='text'
            placeholder='https://example.com'
          />
        </div>
        <Button disabled={pending}>Shorten</Button>
      </form>
      {state.success && (
        <div>
          <Alert variant='default'>
            <AlertDescription>{state.url} has been created</AlertDescription>
          </Alert>
        </div>
      )}

      {!state.success && state.error && (
        <div>
          <Alert variant='destructive'>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default InputUrl;
