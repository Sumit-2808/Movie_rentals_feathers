// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { rentalsClient } from './services/rentals/rentals.shared.js'

import { moviesClient } from './services/movies/movies.shared.js'

import { customersClient } from './services/customers/customers.shared.js'

import { genresClient } from './services/genres/genres.shared.js'

import { userClient } from './services/users/users.shared.js'

/**
 * Returns a  client for the movie_rental_feathers app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(genresClient)

  client.configure(customersClient)

  client.configure(moviesClient)

  client.configure(rentalsClient)

  return client
}
