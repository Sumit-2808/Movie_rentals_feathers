export const customersPath = 'customers'

export const customersMethods = ['find', 'get', 'create', 'patch', 'remove']

export const customersClient = (client) => {
  const connection = client.get('connection')

  client.use(customersPath, connection.service(customersPath), {
    methods: customersMethods
  })
}
