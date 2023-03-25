export const fetchMovie = () => {
  return async (context) => {
    const movieId = context.data.movieId
    const movieService = context.app.service('movies')
    const movie = await movieService.get(movieId)
    if (movie.numberInStock == 0) throw new Error({ message: 'Movie out of stock' })
    context.data.movie = {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      numberInStock: movie.numberInStock-1
    }
    console.log(movieId)
    delete context.data.movieId
    return context
  }
}