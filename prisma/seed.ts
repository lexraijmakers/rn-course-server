import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Lex',
    age: 27,
  },
  {
    name: 'Tamara',
    age: 28,
  },
  {
    name: 'Akin',
    age: 32,
  },
  {
    name: 'Maikey',
    age: 28,
  },
  {
    name: 'Thomas',
    age: 26,
  },
  {
    name: 'Luuk',
    age: 31,
  },
]

const main = async () => {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
