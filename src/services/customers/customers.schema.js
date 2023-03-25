// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const customersSchema = {
  $id: 'Customers',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'name', 'phone', 'isGold'],
  properties: {
    _id: ObjectIdSchema(),
    name: { type: 'string' },
    phone: { type: 'string' },
    isGold: { type: 'boolean' }
  }
}
export const customersValidator = getValidator(customersSchema, dataValidator)
export const customersResolver = resolve({})

export const customersExternalResolver = resolve({})

// Schema for creating new data
export const customersDataSchema = {
  $id: 'CustomersData',
  type: 'object',
  additionalProperties: false,
  required: ['name', 'phone', 'isGold'],
  properties: {
    ...customersSchema.properties
  }
}
export const customersDataValidator = getValidator(customersDataSchema, dataValidator)
export const customersDataResolver = resolve({})

// Schema for updating existing data
export const customersPatchSchema = {
  $id: 'CustomersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...customersSchema.properties
  }
}
export const customersPatchValidator = getValidator(customersPatchSchema, dataValidator)
export const customersPatchResolver = resolve({})

// Schema for allowed query properties
export const customersQuerySchema = {
  $id: 'CustomersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(customersSchema.properties)
  }
}
export const customersQueryValidator = getValidator(customersQuerySchema, queryValidator)
export const customersQueryResolver = resolve({})
