import { faker } from '@faker-js/faker';
import { type NewUser, users } from "../../src/db/schema/user.schema.ts";
import { hashPassword } from '../../src/services/passwords.ts';
import db from '../../src/db/connection.ts';
import { generateToken } from '../../src/services/jwt.ts';
import { clients, type NewClient } from '../../src/db/schema/client.schema.ts';
import { BILLING_TYPE_VALUES, projects, STATUS_VALUES, type NewProject } from '../../src/db/schema/project.schema.ts';
import { timeEntities, type NewTimeEntity } from '../../src/db/schema/timeEntity.schema.ts';

export async function createTestUser(userData: Partial<NewUser> = {}) {
  const firstName = faker.person.firstName('male')
  const lastName = faker.person.lastName('male')

  const defaultData = {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.username({ firstName, lastName }),
    password: faker.internet.password({ length: 5 }),
    age: faker.number.int({ min: 18, max: 65 }),
    firstName,
    lastName,
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

export async function createDemoUserWithoutToken() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  const defaultData = {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.username({ firstName, lastName }),
    password: faker.internet.password({ length: 5 }),
    age: faker.number.int({ min: 18, max: 65 }),
    firstName,
    lastName,
  }

  const hashedPassword = await hashPassword(defaultData.password);
  const [user] = await db.insert(users).values({
    ...defaultData,
    password: hashedPassword,
  })
    .returning()

  return user;
}

export async function createDemoClient() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const defaultData: NewClient = {
    name: faker.company.name(),
    primaryContactName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName, provider: 'clientcorp.com' }),
    industry: faker.commerce.department(),
    address: faker.location.streetAddress(true)
  }

  const [client] = await db.insert(clients)
    .values({ ...defaultData })
    .returning()

  return client;
}

export async function createDemoProject(availableClientIds: string[]) {
  const projectStartDate = faker.date.recent({ days: 365 });
  const projectEndDate = faker.date.soon({ days: 365, refDate: projectStartDate });

  const defaultData: NewProject = {
    name: faker.commerce.productName() + ' ' + faker.helpers.arrayElement(['Migration', 'Platform', 'Integration', 'Redesign']),
    billingType: faker.helpers.arrayElement(BILLING_TYPE_VALUES),
    budgetTotal: String(faker.number.int({ min: 1000, max: 500000 })),
    startDate: projectStartDate,
    endDate: projectEndDate,
    status: faker.helpers.arrayElement(STATUS_VALUES),
    clientId: faker.helpers.arrayElement(availableClientIds),
  }

  const [project] = await db.insert(projects)
    .values({ ...defaultData })
    .returning()

  return project;
}

export async function createDemoTimeEntity(userIds: string[], projectIds: string[]) {
  const commonDurations = [2, 3, 4, 5, 6, 7.5, 8];

  const defaultData: NewTimeEntity = {
    userId: faker.helpers.arrayElement(userIds),
    projectId: faker.helpers.arrayElement(projectIds),
    date: faker.date.recent({ days: 365 }),
    duration: faker.helpers.arrayElement(commonDurations).toString(),
    notes: faker.lorem.sentence({ min: 3, max: 7 }),
    isBillable: faker.datatype.boolean(),
  }

  const [timeEntity] = await db.insert(timeEntities)
    .values({ ...defaultData })
    .returning()

  return timeEntity;
}

export async function cleanupDatabase() {
  await db.delete(users)
}
