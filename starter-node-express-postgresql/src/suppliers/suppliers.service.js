const knex = require("../db/connection");

function list() {
  return knex("suppliers").select('*')
}

function create(supplier) {
    return knex("suppliers")
      .insert(supplier) //from post body
      .returning("*")
      .then((createdRecords) => createdRecords[0]); //shows the first record created same as first but diff syntax
  }
  function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first(); //returns first matching supplier id data
  }

  /*
  //random example
 function read (id) {
   return knex("foos").select('*').where({id}).first()
 }
*/
  
  function update(updatedSupplier) {
    return knex("suppliers")
      .select("*")
      .where({ supplier_id: updatedSupplier.supplier_id })
      .update(updatedSupplier, "*").then((updatedRecords) => updatedRecords[0]);// updates if updated id matches
  }

  function destroy(supplier_id) {
    return knex("suppliers").where({ supplier_id }).del(); //when id matches entry gets deleted
  }

/*
  //random async await and .then conversion examples
  doAFetch().then(data => console.log(data))
  const data = await doAfetch();
  console.log(data)

  getAnswer(question).then(y => console.log(y))

    const y = await x
    
    getAnswer(question)
*/

module.exports = {
  list,  
  create,
    read,
    update,
    delete: destroy,
  };