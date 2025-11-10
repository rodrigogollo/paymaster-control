import logger from "../services/logger.ts";
import db from "./connection.ts";
import { clients, type NewClient } from "./schema/client.schema.ts";
import { projects } from "./schema/project.schema.ts";
import { timeEntities } from "./schema/timeEntity.schema.ts";
import { users } from "./schema/user.schema.ts";
import {
  createDemoClient,
  createDemoProject,
  createDemoTimeEntity,
  createDemoUserWithoutToken,
} from "../../tests/setup/dbHelpers.ts";

async function seed() {
  logger.info("Starting database seed...");
  try {
    logger.info("Clearing existing data...");
    await db.delete(timeEntities);
    await db.delete(projects);
    await db.delete(clients);
    await db.delete(users);

    logger.info("Creating Demo users...");

    const userIds = await createDemoUsers(100);

    logger.info("Creating Demo clients...");
    const clientIds = await createDemoClients(100);

    logger.info("Creating Demo projects...");
    const projectIds = await createDemoProjects(clientIds, 100);

    logger.info("Creating demo time entities...");
    await createDemoTimeEntities(userIds, projectIds, 100);
  } catch (e) {
    logger.error("Seed failed", e);
    process.exit(1);
  }
}

async function createDemoTimeEntities(
  userIds: string[],
  projectIds: string[],
  size = 10,
) {
  const timeEntitiesPromises = Array.from({ length: size }).map((entity) => {
    const entityData = createDemoTimeEntity(userIds, projectIds);
    return entityData;
  });
  const createdEntities = await Promise.all(timeEntitiesPromises);
  const entityIds = createdEntities.map((entity) => entity.id);
  return entityIds;
}

async function createDemoProjects(availableClientIds: string[], size = 10) {
  const projectPromises = Array.from({ length: size }).map(() => {
    const projectData = createDemoProject(availableClientIds);
    return projectData;
  });
  const createdProjects = await Promise.all(projectPromises);
  const projectIds = createdProjects.map((project) => project.id);
  return projectIds;
}

async function createDemoUsers(size = 10) {
  const userPromises = Array.from({ length: size }).map(() => {
    const userData = createDemoUserWithoutToken();
    return userData;
  });
  const createdUsers = await Promise.all(userPromises);
  const userIds = createdUsers.map((user) => user.id);
  return userIds;
}

async function createDemoClients(size = 10) {
  const clientPromises = Array.from({ length: size }).map(() => {
    const clientData = createDemoClient();
    return clientData;
  });

  const createdClients = await Promise.all(clientPromises);
  const clientIds = createdClients.map((client) => client.id);
  return clientIds;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((e) => process.exit(1));
}

export default seed;
