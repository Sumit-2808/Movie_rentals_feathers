// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const rentalsSchema = {
  $id: 'Rentals',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'customer', 'movie', 'rentalFee', 'dateOut'],
  properties: {
    _id: ObjectIdSchema(),
    customer: {
      type: 'object',
      properties: {
        _id: ObjectIdSchema(),
        name: {
          type: 'string'
        },
        phone: {
          type: 'string'
        }
      },
      required: ['phone', '_id', 'name']
    },
    movie: {
      type: 'object',
      properties: {
        _id: ObjectIdSchema(),
        title: {
          type: 'string'
        },
        numberInStock: {
          type: 'number'
        },
        dailyRentalRate: {
          type: 'number'
        }
      },
      required: ['_id', 'dailyRentalRate', 'numberInStock', 'title']
    },
    rentalFee: {
      type: 'number'
    },
    dateOut: {
      type: 'object'
    },
    dateIn: {
      type: 'object'
    }
  }
}
export const rentalsValidator = getValidator(rentalsSchema, dataValidator)
export const rentalsResolver = resolve({})

export const rentalsExternalResolver = resolve({})

// Schema for creating new data
export const rentalsDataSchema = {
  $id: 'RentalsData',
  type: 'object',
  additionalProperties: false,
  required: ['customer', 'movie', 'rentalFee', 'dateOut'],
  properties: {
    ...rentalsSchema.properties
  }
}
export const rentalsDataValidator = getValidator(rentalsDataSchema, dataValidator)
export const rentalsDataResolver = resolve({})

// Schema for updating existing data
export const rentalsPatchSchema = {
  $id: 'RentalsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...rentalsSchema.properties
  }
}
export const rentalsPatchValidator = getValidator(rentalsPatchSchema, dataValidator)
export const rentalsPatchResolver = resolve({})

// Schema for allowed query properties
export const rentalsQuerySchema = {
  $id: 'RentalsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(rentalsSchema.properties)
  }
}
export const rentalsQueryValidator = getValidator(rentalsQuerySchema, queryValidator)
export const rentalsQueryResolver = resolve({})