import { HabitDay } from "./HabitDay"
import { getDatesSinceYearBeginning } from '../../helpers/getDatesSinceYearBeginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((day, id) =>
                    <div key={id} className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
                        {day}
                    </div>)}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {getDatesSinceYearBeginning().map(date => <HabitDay key={date.toString()}/>)}
            </div>


        </div>
    )
}

