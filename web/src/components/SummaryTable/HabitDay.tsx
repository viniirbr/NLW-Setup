import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { ProgressBar } from '../ProgressBar'

interface Props {
  completed: number
  amount: number
}

export function HabitDay({ completed, amount }: Props) {

  const completedAmountRatio = (completed / amount) * 100

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx(`w-10 h-10 border-2 bg-zinc-900 border-zinc-800 rounded-lg`, {
        'bg-violet-900 border-violet-700': completedAmountRatio > 0 && completedAmountRatio < 20,
        'bg-violet-800 border-violet-600': completedAmountRatio >= 20 && completedAmountRatio < 40,
        'bg-violet-700 border-violet-500': completedAmountRatio >= 40 && completedAmountRatio < 60,
        'bg-violet-600 border-violet-500': completedAmountRatio >= 60 && completedAmountRatio < 80,
        'bg-violet-500 border-violet-400': completedAmountRatio >= 80,
      })}>

      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className='min-w-popover p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>
            Terça-feira
          </span>
          <span className='mt-1 font-extrabold text-3xl leading-tight'>
            17/01
          </span>
          <ProgressBar progress={completedAmountRatio * 100} />
          <Popover.Arrow width={16} height={12} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

