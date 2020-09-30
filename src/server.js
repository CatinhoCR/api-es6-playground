'use strict'
const env = require('./env/constants')
const mongoose = require('mongoose')
const app = require('./app')
const { uri } = require('./env/constants')

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
//const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";

async function main() {
  try {
    mongoose.Promise = global.Promise
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    await mongoose.connect(env.uri + env.md + env.db, () => {
      console.log('La BD funciona ' + env.uri + env.md + env.db)

      app.listen(env.port, () => {
        console.log('REST API server ' + env.uri + env.port)
      })
    })
  } catch (error) {
    console.log(error)
  } finally {
    // close
  }
}

main()
