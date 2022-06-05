const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
})

const getVehicleByVin = (request, response) => {
  const id = request.params.id;
  pool.query('SELECT * FROM vehicle where vin = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllVehicles = (request, response) => {
  const count = request.query.count;
  const vin = request.query.vin;
  const driver = request.query.driver;
  const licence = request.query.licence;

  if (count) {
    pool.query('SELECT * FROM vehicle limit $1', [count], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  if (vin) {
    pool.query('SELECT * FROM vehicle where vin = $1', [vin], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  if (driver) {
    pool.query('SELECT * FROM vehicle where driver = $1', [driver], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  if (licence) {
    pool.query('SELECT * FROM vehicle where licence_plate = $1', [licence], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const editVehicle = (request, response) => {
  const id = request.params.id;
  const driver = request.body.driver;
  const customer = request.body.customer;
  const office = request.body.office;
  const licence = request.body.licence;
  pool.query('UPDATE vehicle SET driver = $1, customer_name = $2, office = $3, licence_plate = $4 WHERE vin = $5', [driver, customer, office, licence, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(204).send('ok');
  })
}

module.exports = {
  getAllVehicles,
  editVehicle,
  getVehicleByVin
}