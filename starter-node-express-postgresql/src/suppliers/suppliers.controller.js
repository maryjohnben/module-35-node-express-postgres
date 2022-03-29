const suppliersService = require("./suppliers.service.js");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const res = require("express/lib/response");

// async function create(req, res, next) {
//   res.status(201).json({ data: { supplier_name: "new supplier" } });
// }

// async function update(req, res, next) {
//   res.json({ data: { supplier_name: "updated supplier" } });
// }

/*
//old way
function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  suppliersService
    .update(updatedSupplier)
    .then((data) => res.json({ data }))
    .catch(next);
}
*/
/*
//with async error boundary
async function list(req, res, next){
  const data = await suppliersService.list()
  res.json({data})
}
*/

function list(req, res, next) {
  suppliersService.list().then((data)=> res.json({data})).catch(next);
}

async function update(req, res) {
  const updatedSupplier = {
    ...req.body.data, //passed in by end user or so
    supplier_id: res.locals.supplier.supplier_id, //setting supplier_id from res.locals variable(local)
  };
  const data = await suppliersService.update(updatedSupplier);
  res.json({ data }); //updates
}

/*
// old way
function create(req, res, next) {
  suppliersService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}
*/
async function create(req, res) {
  const data = await suppliersService.create(req.body.data);
  res.status(201).json({ data });
}

//checks if these required properties are in the ine data body
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email"); 
 
//checks if any fields entered are valid meaning already existing in the table
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  ); //if any of the keys does not match valid properties array then that is filtered to invalidFields

  if (invalidFields.length) { //if there is anything invalid
    return next({ //goes to error handler
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function read(req, res, next) {
  const {supplierId} = req.params
  const data = await suppliersService.read(supplierId)
  res.json({data})
}
/*
// old way
function supplierExists(req, res, next) {
  suppliersService
    .read(req.params.supplierId)
    .then((supplier) => {
      if (supplier) {
        res.locals.supplier = supplier;
        return next();
      }
      next({ status: 404, message: `Supplier cannot be found.` });
    })
    .catch(next);
}
*/
async function supplierExists(req, res, next) {
  const supplier = await suppliersService.read(req.params.supplierId);
  if (supplier) {
    res.locals.supplier = supplier; //setting res.locals
    console.log(res.locals.supplier)
    return next();
  }
  next({ status: 404, message: `Supplier cannot be found.` });
}

/*
//old way
function destroy(req, res, next) {
  suppliersService
    .delete(res.locals.supplier.supplier_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}
*/
async function destroy(req, res) {
  const { supplier } = res.locals;
  await suppliersService.delete(supplier.supplier_id);
  res.sendStatus(204);
}

/*
//random example
async function read(req, res, next) {
  const {id} = req.params
  const data = await foosService.read(id)
  res.json({data})
}
*/

module.exports = {
  list,
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(supplierExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(supplierExists), asyncErrorBoundary(destroy)],
  read: [asyncErrorBoundary(read)],
};
