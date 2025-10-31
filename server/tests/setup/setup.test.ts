import { cleanupDatabase, createTestUser } from "./dbHelpers"

describe('Test setup', () => {
  it('should connect to the test db', async () => {
    const { user, token } = await createTestUser()

    expect(user).toBeDefined()
    await cleanupDatabase()
  })
})
