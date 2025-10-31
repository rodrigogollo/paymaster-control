import { faker } from '@faker-js/faker';
import { cleanupDatabase, createTestUser } from "./setup/dbHelpers.ts";
import request from 'supertest';
import app from '../src/app.ts';


describe('Authentication Endpoints', () => {
  beforeEach(() => faker.seed(123));

  afterEach(async () => {
    await cleanupDatabase()
  })

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const firstName = faker.person.firstName('male')
      const lastName = faker.person.lastName('male')

      const userData = {
        email: faker.internet.email({ firstName, lastName }),
        username: faker.internet.username({ firstName, lastName }),
        password: faker.internet.password({ length: 5 }),
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)

      expect(response.body).toHaveProperty('user')
      expect(response.body).toHaveProperty('token')
      expect(response.body).not.toHaveProperty('password')
    })
  })
})

describe('POST /api/auth/login', () => {
  it('should log in with valid credentials', async () => {
    const testUser = await createTestUser();
    const credentials = {
      email: testUser.user.email,
      password: testUser.rawPassword,
    }

    const response = await request(app)
      .post('/api/auth/login')
      .send(credentials)
      .expect(201)

    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
    expect(response.body).not.toHaveProperty('password')
  })
})
