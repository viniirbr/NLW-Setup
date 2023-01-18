import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const app = Fastify();
app.register(cors);

const prisma = new PrismaClient()

app.get('/habits', async () => {
    const habits = await prisma.habit.findMany();
    console.log(habits)
    return habits
})

app.post('/habits', async ({  }) => {
    const newHabit = await prisma.habit.create({ data: { title: 'Read', created_at: new Date() } });
    console.log(newHabit)
})

app.listen({
    port: 3333
}).then((url) => {
    console.log(`Running on ${url}...`)
})