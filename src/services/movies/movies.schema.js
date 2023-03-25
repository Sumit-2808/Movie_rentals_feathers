// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'

import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const moviesSchema = {
  $id: 'Movies',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'title',"dailyRentalRate","numberInStock","genre"],
  properties: {
    _id: ObjectIdSchema(),
    title: { type: 'string' },
    numberInStock:{type:"number"},
    dailyRentalRate:{type:"number"},
    genre:{type:"object"},
    liked:{type:"boolean"},
  }
}
export const moviesValidator = getValidator(moviesSchema, dataValidator)
export const moviesResolver = resolve({})

export const moviesExternalResolver = resolve({})

// Schema for creating new data
export const moviesDataSchema = {
  $id: 'MoviesData',
  type: 'object',
  additionalProperties: false,
  required: ['title',"dailyRentalRate","numberInStock","genre"],
  properties: {
    ...moviesSchema.properties
  }
}
export const moviesDataValidator = getValidator(moviesDataSchema, dataValidator)
export const moviesDataResolver = resolve({})

// Schema for updating existing data
export const moviesPatchSchema = {
  $id: 'MoviesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...moviesSchema.properties
  }
}
export const moviesPatchValidator = getValidator(moviesPatchSchema, dataValidator)
export const moviesPatchResolver = resolve({})

// Schema for allowed query properties
export const moviesQuerySchema = {
  $id: 'MoviesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(moviesSchema.properties)
  }
}
export const moviesQueryValidator = getValidator(moviesQuerySchema, queryValidator)
export const moviesQueryResolver = resolve({})
