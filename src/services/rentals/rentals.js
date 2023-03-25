// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { rentalSchema } from './rentals.model.js'
import validate from 'feathers-validate-joi'
import { setRentalFee } from './hooks/setRentalFee.js'
import { fetchMovie } from './hooks/fetchMovie.js'
import { fetchCustomer } from './hooks/fetchCustomer.js'
import { setMovie } from './hooks/setMovie.js'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { admin } from '../../hooks/admin.js'
import { setDate } from './hooks/setDate.js'
import { updateRentals } from './hooks/updateRentals.js'
import {
  rentalsDataValidator,
  rentalsPatchValidator,
  rentalsQueryValidator,
  rentalsResolver,
  rentalsExternalResolver,
  rentalsDataResolver,
  rentalsPatchResolver,
  rentalsQueryResolver
} from './rentals.schema.js'
import { RentalsService, getOptions } from './rentals.class.js'
import { rentalsPath, rentalsMethods } from './rentals.shared.js'
import { decreaseNumberInStock } from './hooks/decreaseNumberInStock.js'
import { increaseNumberInStock } from './hooks/increaseNumberInStock.js'

export * from './rentals.class.js'
export * from './rentals.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const rentals = (app) => {
  // Register our service on the Feathers application
  app.use(rentalsPath, new RentalsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: rentalsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(rentalsPath).hooks({
    around: {
      all: [
        //authenticate('jwt'),
        schemaHooks.resolveExternal(rentalsExternalResolver),
        schemaHooks.resolveResult(rentalsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(rentalsQueryValidator), schemaHooks.resolveQuery(rentalsQueryResolver)],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        validate.form(rentalSchema, { abortEarly: false }),
        fetchMovie(),
        fetchCustomer(),
        setRentalFee(),
        setDate(),
        schemaHooks.validateData(rentalsDataValidator),
        schemaHooks.resolveData(rentalsDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        setMovie(),
        setDate(),
        schemaHooks.validateData(rentalsPatchValidator),
        schemaHooks.resolveData(rentalsPatchResolver)
      ],
      remove: [authenticate('jwt'), admin(), setMovie(), updateRentals()]
    },
    after: {
      all: [],
      create: [decreaseNumberInStock()],
      patch: [increaseNumberInStock()],
      remove: [increaseNumberInStock()]
    },
    error: {
      all: []
    }
  })
}
