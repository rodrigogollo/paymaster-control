import { faker } from '@faker-js/faker';
import { NewUser, users } from "../../src/db/schema.ts";
import { hashPassword } from '../../src/services/passwords.ts';
import db from '../../src/db/connection.ts';
import { generateToken } from '../../src/services/jwt.ts';

export async function createTestUser(userData: Partial<NewUser> = {}) {
  const firstName = faker.person.firstName('male')
  const lastName = faker.person.lastName('male')

  const defaultData = {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.username({ firstName, lastName }),
    password: faker.internet.password({ length: 5 }),
    firstName: firstName,
    lastName: lastName,
    ...userData,
  }

  const hashedPassword = await hashPassword(defaultData.password);
  const [user] = await db.insert(users).values({
    ...defaultData,
    password: hashedPassword
  })
    .returning()

  const token = generateToken({
    id: user.id,
    email: user.email,
    username: user.username
  })

  return {
    token,
    user,
    rawPassword: defaultData.password
  }
}


export async function cleanupDatabase() {
  await db.delete(users)
}
