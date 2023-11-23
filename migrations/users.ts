import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("username", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("role", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("users");
}
