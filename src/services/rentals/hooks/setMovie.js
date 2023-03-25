export const setMovie = () => {
  return async (context) => {
    const rentalId = context.id
    console.log(context.data)
    const rentalService = context.app.service('rentals')
    const rental = await rentalService.get(rentalId)
    context.params.movie = rental.movie
    if (context.method === 'patch') {
      context.data = {
        movie: {
          _id: rental.movie._id,
          numberInStock: rental.movie.numberInStock + 1,
          dailyRentalRate: rental.movie.dailyRentalRate,
          title: rental.movie.title
        }
      }
    }
    return context
  }
}