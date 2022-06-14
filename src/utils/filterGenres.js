export const filterGenres = (movie, setState, genres) => {
  let newArr = []
  for (let i = 0; i < movie?.genre_ids?.length; i++) {
    let newG = genres?.filter((genre) => genre?.id === movie?.genre_ids[i])
    newArr?.push(newG[0]?.name)
  }
  setState(newArr)
}
