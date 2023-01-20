import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from 'zod'

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
}