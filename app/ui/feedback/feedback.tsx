'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, Kbd, Textarea } from '@nextui-org/react'

const MAX_TEXT_LENGTH = 1000
const MIN_TEXT_LENGTH = 10

export default function Feedback() {
  const { pending } = useFormStatus()
  const [feedback, setFeedback] = useState('')

  return (
    <>
      <Textarea
        name='feedback'
        label='Feedback'
        placeholder='Type your feedback...'
        description='Feedback is anonymous. Available once for 7 days.'
        errorMessage={`Feedback must not exceed ${MAX_TEXT_LENGTH} characters.`}
        maxRows={30}
        minRows={5}
        maxLength={
          feedback.length > MAX_TEXT_LENGTH ? MAX_TEXT_LENGTH : undefined
        }
        minLength={MIN_TEXT_LENGTH}
        isInvalid={feedback.length > MAX_TEXT_LENGTH}
        isDisabled={pending}
        value={feedback}
        onValueChange={setFeedback}
        classNames={{
          input: 'resize-y min-h-[140px]',
        }}
      />
      <div className='mt-4 flex justify-end'>
        <p
          className={`text-sm text-default-${pending || feedback.length < MIN_TEXT_LENGTH ? '300' : '500'}`}
        >
          Press{' '}
          <Button
            aria-label='Enter'
            type='submit'
            isDisabled={pending || feedback.length < MIN_TEXT_LENGTH}
            className='cursor-pointer bg-background px-0'
            size='sm'
          >
            <Kbd keys={['enter']}>Enter</Kbd>
          </Button>{' '}
          to Send Feedback
        </p>
      </div>
    </>
  )
}