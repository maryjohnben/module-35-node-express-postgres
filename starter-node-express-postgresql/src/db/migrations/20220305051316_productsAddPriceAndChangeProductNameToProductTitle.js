/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//some changes made in products table
exports.up = function(knex) {
    return knex.schema.table("products", (table) => {
        table.renameColumn("product_name", "product_title");
        table.decimal("product_price");  // Add a new column
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//drop these changes
exports.down = function(knex) {
    return knex.schema.table("products", (table) => {
        table.renameColumn("product_title", "product_name");
        table.dropColumn("product_price");
      });
};
