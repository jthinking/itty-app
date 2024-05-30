import { Router, json, text } from "itty-router";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import * as schema from "./schema";

migrate(db, { migrationsFolder: "drizzle" });

const router = Router();

router.get("/", () => {
  const query = sql`select "hello world" as text`;
  const result = db.get<{ text: string }>(query);
  return json(result);
});

router.get("/insert", async () => {
  await db.insert(schema.movies).values([
    {
      title: "The Matrix",
      releaseYear: 1999,
    },
    {
      title: "The Matrix Reloaded",
      releaseYear: 2003,
    },
    {
      title: "The Matrix Revolutions",
      releaseYear: 2003,
    },
  ]);
  return text("ok");
});

router.get("/list", async () => {
  const result = await db.select().from(schema.movies);
  return json(result);
});

export default router;
