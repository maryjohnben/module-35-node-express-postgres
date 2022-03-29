//to start first migration use
//npx knex migrate:make <name>
//to see pending migrations use 
//knex migrate:list
//supplier table is created
//knex migrate:up <filename> or migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable("suppliers", (table) => {
        table.increments("supplier_id").primary(); // Sets supplier_id as the primary key
        table.string("supplier_name");
        table.string("supplier_address_line_1");
        table.string("supplier_address_line_2");
        table.string("supplier_city");
        table.string("supplier_state");
        table.string("supplier_zip");
        table.string("supplier_phone");
        table.string("supplier_email");
        table.text("supplier_notes"); //higher character limit than string
        table.string("supplier_type_of_goods");
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//deletes table 
//knex migrate:down <filename>
exports.down = function(knex) {
    return knex.schema.dropTable("suppliers");
};
