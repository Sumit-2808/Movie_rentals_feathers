// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const genresSchema = {
  $id: 'Genres',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'name'],
  properties: {
    _id: ObjectIdSchema(),
    name: { type: 'string' }
  }
}
export const genresValidator = getValidator(genresSchema, dataValidator)
export const genresResolver = resolve({})

export const genresExternalResolver = resolve({})

// Schema for creating new data
export const genresDataSchema = {
  $id: 'GenresData',
  type: 'object',
  additionalProperties: false,
  required: ['name'],
  properties: {
    ...genresSchema.properties
  }
}
export const genresDataValidator = getValidator(genresDataSchema, dataValidator)
export const genresDataResolver = resolve({})

// Schema for updating existing data
export const genresPatchSchema = {
  $id: 'GenresPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...genresSchema.properties
  }
}
export const genresPatchValidator = getValidator(genresPatchSchema, dataValidator)
export const genresPatchResolver = resolve({})

// Schema for allowed query properties
export const genresQuerySchema = {
  $id: 'GenresQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(genresSchema.properties)
  }
}
export const genresQueryValidator = getValidator(genresQuerySchema, queryValidator)
export const genresQueryResolver = resolve({})
