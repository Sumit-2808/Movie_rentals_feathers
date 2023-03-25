export const rentalsPath = 'rentals'

export const rentalsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const rentalsClient = (client) => {
  const connection = client.get('connection')

  client.use(rentalsPath, connection.service(rentalsPath), {
    methods: rentalsMethods
  })
}
