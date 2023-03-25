export const genresPath = 'genres'

export const genresMethods = ['find', 'get', 'create', 'patch', 'remove']

export const genresClient = (client) => {
  const connection = client.get('connection')

  client.use(genresPath, connection.service(genresPath), {
    methods: genresMethods
  })
}
