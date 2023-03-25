export const updateRentals = () => {
    return async (context) => {
      const rentalId = context.id
  
      const rentalService = context.app.service('rentals')
      const rental = await rentalService.get(rentalId)
      // context.data = {
      //   movie: {
      //     _id: rental.movie._id,
      //     numberInStock: rental.movie.numberInStock + 1,
      //     dailyRentalRate: rental.movie.dailyRentalRate,
      //     title: rental.movie.title
      //   }
      // }
      await rentalService.patch(rentalId, { 'movie.numberInStock': rental.movie.numberInStock + 1 })
  
      return context
    }
  }