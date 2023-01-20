interface Props {
    progress: number
}

export function ProgressBar({ progress }: Props) {
    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div className='h-3 rounded-xl bg-violet-600'
                role="progressbar"
                aria-label="Hábitos completados em relação ao total"
                aria-value={progress}
                style={{ width: `${progress}%` }} />
        </div>
    )
}
