// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { genreSchema } from './genres.model.js'
import validate from 'feathers-validate-joi'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  genresDataValidator,
  genresPatchValidator,
  genresQueryValidator,
  genresResolver,
  genresExternalResolver,
  genresDataResolver,
  genresPatchResolver,
  genresQueryResolver
} from './genres.schema.js'
import { GenresService, getOptions } from './genres.class.js'
import { genresPath, genresMethods } from './genres.shared.js'

export * from './genres.class.js'
export * from './genres.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const genres = (app) => {
  // Register our service on the Feathers application
  app.use(genresPath, new GenresService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: genresMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(genresPath).hooks({
    around: {
      all: [
        //authenticate('jwt'),
        schemaHooks.resolveExternal(genresExternalResolver),
        schemaHooks.resolveResult(genresResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(genresQueryValidator), schemaHooks.resolveQuery(genresQueryResolver)],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        validate.form(genreSchema, { abortEarly: false }),
        schemaHooks.validateData(genresDataValidator),
        schemaHooks.resolveData(genresDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        validate.form(genreSchema, { abortEarly: false }),
        schemaHooks.validateData(genresPatchValidator),
        schemaHooks.resolveData(genresPatchResolver)
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
