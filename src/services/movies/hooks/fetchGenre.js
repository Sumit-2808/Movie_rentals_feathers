export const fetchGenre=()=>{
    return async(context)=>{
        const genreService=context.app.service("/genres")
        const genre=await genreService.get(context.data.genreId)
        if(!genre)throw new Error("genre with given id is not found")
        context.data.genre=genre
        delete context.data.genreId
        return context
    }
}