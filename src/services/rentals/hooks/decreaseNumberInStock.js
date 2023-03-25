export const decreaseNumberInStock = ()=> {
  return async (context) => {
    const movie = context.data.movie;
    console.log(movie);
    const movieService = context.app.service("movies");
    await movieService.patch(movie._id, { numberInStock: movie.numberInStock } );
    return context;
  };
}
