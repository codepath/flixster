import '../styles/MovieCard.css'

const MovieCard = ({ title, posterPath, voteAverage, onClick }) => {
  
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={imageUrl} alt={title} />

      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {voteAverage}</p>
      </div>

    </div>
  )
}

export default MovieCard
