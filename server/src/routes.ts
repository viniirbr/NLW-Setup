import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { string, z } from 'zod'

export async function appRoutes(fastify: FastifyInstance) {

    fastify.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })
        const { title, weekDays } = createHabitBody.parse(request.body);
        const todayTimeReset = new Date();
        todayTimeReset.setHours(0, 0, 0, 0);
        const newHabit = await prisma.habit.create({
            data: {
                title,
                created_at: todayTimeReset,
                weekDays: {
                    create: weekDays.map(weekDay => ({ week_day: weekDay }))
                }
            }
        });
        return newHabit
    })

    fastify.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const { date } = getDayParams.parse(request.query)

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date
                },
                weekDays: {
                    some: {
                        week_day: date.getDay()
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where: {
                date: date
            },
            include: {
                dayHabits: true
            }
        })

        const completedHabits = await day?.dayHabits.map(dayHabit => dayHabit.habit_id)

        return { possibleHabits, completedHabits }

    })

    fastify.patch('/:habitId/toggle', async (request) => {
        const toggleHabitParam = z.object({
            habitId: string().uuid()
        })

        const { habitId } = toggleHabitParam.parse(request.params)

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: habitId
                }
            }
        })

        if (dayHabit) {
            const deletedHabit = await prisma.dayHabit.delete({
                where: {
                    day_id_habit_id: {
                        day_id: dayHabit.day_id,
                        habit_id: dayHabit.habit_id
                    }
                }
            })
            return {
                deletedHabit: deletedHabit
            }
        } else {
            const completedHabit = await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: habitId
                }
            })
            return {
                completedHabit: completedHabit
            }
        }
    })
}