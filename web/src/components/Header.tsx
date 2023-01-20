import { Plus } from 'phosphor-react'
import logo from '../assets/logo.svg'

export function Header() {
  return (
    <header className='w-full max-w-3xl mx-auto flex items-center justify-between'>
          <img src={logo} alt="logo" />
          <button
            type='button'
            className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3
            hover:bg-violet-700 transition-all duration-300'
          >
            Novo hábito
            <Plus size={20} className='text-violet-500' />
          </button>
        </header>
  )
}
