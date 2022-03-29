
//products_categories middlle table created
exports.up = function(knex) {
    return knex.schema.createTable("products_categories", (table) => {
        table.integer("product_id").unsigned().notNullable(); //unsigned() means no negative numbers allowed
        table
          .foreign("product_id") //from products table
          .references("product_id")
          .inTable("products")
          .onDelete("CASCADE"); //meaning everything in child tables and things like that as well
        table.integer("category_id").unsigned().notNullable();
        table
          .foreign("category_id") //from categories table
          .references("category_id")
          .inTable("categories")
          .onDelete("CASCADE");
    
        table.timestamps(true, true);
      });
};


exports.down = function(knex) {
    return knex.schema.dropTable("products_categories");
};
