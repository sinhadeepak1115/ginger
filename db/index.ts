import "server-only";

import neo4j from "neo4j-driver";

export const driver = neo4j.driver(
  "neo4j://localhost:7474",
  neo4j.auth.basic("neo4j", "your_password"),
);
