import prisma from "../../src/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userOne = {
  input: {
    name: "yubi khadka",
    email: "yubikhadka@gmail.com",
    password: bcrypt.hashSync("buchukhadka"),
  },
  user: undefined,
  jwt: undefined,
};

const userTwo = {
  input: {
    name: "Buchu khadka",
    email: "buchukhadka@gmail.com",
    password: bcrypt.hashSync("yubikhadka"),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  jest.setTimeout(50000);

  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };
