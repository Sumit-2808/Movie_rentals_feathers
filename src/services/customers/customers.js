// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { customerSchema } from './customers.model.js'
import validate from 'feathers-validate-joi'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  customersDataValidator,
  customersPatchValidator,
  customersQueryValidator,
  customersResolver,
  customersExternalResolver,
  customersDataResolver,
  customersPatchResolver,
  customersQueryResolver
} from './customers.schema.js'
import { CustomersService, getOptions } from './customers.class.js'
import { customersPath, customersMethods } from './customers.shared.js'

export * from './customers.class.js'
export * from './customers.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const customers = (app) => {
  // Register our service on the Feathers application
  app.use(customersPath, new CustomersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: customersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(customersPath).hooks({
    around: {
      all: [
        //authenticate('jwt'),
        schemaHooks.resolveExternal(customersExternalResolver),
        schemaHooks.resolveResult(customersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(customersQueryValidator),
        schemaHooks.resolveQuery(customersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        validate.form(customerSchema, { abortEarly: false }),
        schemaHooks.validateData(customersDataValidator),
        schemaHooks.resolveData(customersDataResolver)
      ],
      update: [
        authenticate('jwt'),
        validate.form(customerSchema, { abortEarly: false }),
        schemaHooks.validateData(customersDataValidator),
        schemaHooks.resolveData(customersDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(customersPatchValidator),
        schemaHooks.resolveData(customersPatchResolver)
      ],
      remove: [authenticate('jwt')]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
