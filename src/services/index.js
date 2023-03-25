import { rentals } from './rentals/rentals.js'

import { movies } from './movies/movies.js'

import { customers } from './customers/customers.js'

import { genres } from './genres/genres.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(rentals)

  app.configure(movies)

  app.configure(customers)

  app.configure(genres)

  app.configure(user)

  // All services will be registered here
}
