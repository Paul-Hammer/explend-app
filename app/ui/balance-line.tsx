'use client'

import { useRef } from 'react'

import { peaceOfMindQuotes } from '@/public/data/quotes'
import { Card, CardHeader } from '@nextui-org/react'

import { DEFAULT_CURRENCY_CODE } from '@/config/constants/main'

import { TTransaction, TUser } from '../lib/types'
import { copyToClipboard, getFormattedCurrency } from '../lib/utils'

type TProps = {
  balance: TTransaction['balance']
  currency: TTransaction['currency']
  user: TUser | undefined
}

function BalanceLine({ balance, currency, user }: TProps) {
  const quoteRef = useRef<HTMLQuoteElement>(null)

  const onQuoteCopy = async () => {
    await copyToClipboard(
      quoteRef,
      'Quote copied to the clipboard.',
      'Failed to copy quote to the clipboard.',
    )
  }

  return (
    <div className='px-2'>
      <Card className='p-2' shadow='none'>
        <CardHeader className='flex items-center justify-between px-4'>
          <p className='text-xs font-bold'>Hey {user?.name} 👋🏼</p>
          <small
            className='cursor-pointer select-none text-default-300'
            onClick={onQuoteCopy}
          >
            <q ref={quoteRef}>{peaceOfMindQuotes[0]}</q>
          </small>
          <h4 className='text-lg font-bold'>
            {getFormattedCurrency(balance)}{' '}
            {currency?.code || DEFAULT_CURRENCY_CODE}
          </h4>
        </CardHeader>
      </Card>
    </div>
  )
}

export default BalanceLine
