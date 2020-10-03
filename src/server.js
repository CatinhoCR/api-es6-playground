require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

// TODO: ENV config for using MongoDB or local fake JSON Mock Data

async function main() {
  try {
    mongoose.Promise = global.Promise
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    await mongoose.connect(process.env.MONGO_LOCAL_CONN_URL + process.env.MONGO_DB_NAME, () => {
      console.log('La BD funciona ' + process.env.MONGO_LOCAL_CONN_URL + process.env.MONGO_DB_NAME)

      // env.port
      app.listen(process.env.PORT, () => {
        console.log(`REST API server port: ${process.env.PORT}`)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

main()
