"use server";

import { driver } from "@/db";
import { Neo4JUser } from "@/types";

export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (u: User { applicationId: $applicationId}) RETURN u`,
    { applicationId: id },
  );
  const user = result.records.map((record) => record.get("u").properties);
  return user[0] as Neo4JUser;
};

export const createUser = async (user: Neo4JUser) => {
  const { applicationId, email, firstname, lastname } = user;
  await driver.executeQuery(
    `CREATE (u: User {applicationId, $applicationId, email: $email, firstname : $firstname , lastname: $lastname})`,
    { applicationId, email, firstname, lastname },
  );
};
