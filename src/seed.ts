// // src/seed.ts

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       email: 'test@example.com',
//       password: 'securepassword',
//       name: 'John',
//       surname: 'Doe',
//       dateOfBirth: new Date('1990-01-01'),
//       phoneNumber: '123456789',
//       address: '123 Main St',
//       profilePicture: 'https://example.com/profile.jpg'
//     },
//   });

//   const trip = await prisma.trip.create({
//     data: {
//       origin: 'New York',
//       destination: 'Paris',
//       startDate: new Date('2023-07-01'),
//       duration: 7,
//       budget: 2000,
//       userId: user.id,
//     },
//   });

//   await prisma.accommodation.create({
//     data: {
//       name: 'Hotel Paris',
//       address: '1 Rue de Paris',
//       price: 150,
//       tripId: trip.id,
//     },
//   });

//   await prisma.itinerary.create({
//     data: {
//       day: 1,
//       activities: ['Visit Eiffel Tower', 'Lunch at Le Jules Verne'],
//       tripId: trip.id,
//     },
//   });

//   await prisma.pointOfInterest.create({
//     data: {
//       name: 'Eiffel Tower',
//       description: 'A famous landmark in Paris',
//       type: 'activity',
//       address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
//       tripId: trip.id,
//     },
//   });

//   console.log('Data seeded successfully.');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
