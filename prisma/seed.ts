import { faker } from '@faker-js/faker';
import prisma from 'prisma/prisma';

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();

  // Create 20 users
  const users = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      return prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          age: faker.number.int({ min: 18, max: 80 }),
          password_hash: faker.internet.password(), // In a real app, this should be properly hashed
        },
      });
    })
  );

  // Create 60 posts (3 per user)
  await Promise.all(
    users.flatMap((user) =>
      Array.from({ length: 3 }).map(() =>
        prisma.post.create({
          data: {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(2),
            published: faker.datatype.boolean(),
            author_id: user.id,
          },
        })
      )
    )
  );

  // Create 20 tasks
  await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.task.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(2),
          steps: JSON.stringify([
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
          ]),
          estimated_time: `${faker.number.int({ min: 1, max: 5 })} days`,
          implementation_suggestion: faker.lorem.paragraph(),
          acceptance_criteria: JSON.stringify([
            faker.lorem.sentence(),
            faker.lorem.sentence(),
          ]),
          suggested_tests: JSON.stringify([
            `it('should ${faker.lorem.sentence()}')`,
            `it('should ${faker.lorem.sentence()}')`,
          ]),
          content: faker.lorem.paragraphs(3),
          chat_history: JSON.stringify([
            {
              role: 'user',
              content: faker.lorem.sentence(),
              timestamp: faker.date.recent(),
            },
            {
              role: 'assistant',
              content: faker.lorem.paragraph(),
              timestamp: faker.date.recent(),
            },
          ]),
        },
      })
    )
  );

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
