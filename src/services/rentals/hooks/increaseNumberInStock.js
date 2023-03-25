export const increaseNumberInStock = () => {
  return async (context) => {
    const movie = context.params.movie
    console.log(movie)
    const movieService = context.app.service('movies')
    await movieService.patch(movie._id, { numberInStock: movie.numberInStock+1 })
    return context
  }
}
