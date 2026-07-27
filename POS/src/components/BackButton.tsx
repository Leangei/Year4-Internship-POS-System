import { Link } from 'react-router-dom'
import backIcon from '../assets/login/back.svg'

type BackButtonProps = {
  to: string
  className?: string
}

export default function BackButton({ to, className = '' }: BackButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-slate-200 bg-white shadow-sm text-slate-700 transition hover:bg-slate-50 ${className}`}
    >
      <img src={backIcon} alt="Back" className="h-3 w-3" />
    </Link>
  )
}
