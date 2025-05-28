import '../styles/MovieCard.css'
import placeholderImage from '../assets/placeholder_image.png'

const MovieCard = ({ title, posterPath, voteAverage, onClick }) => {
  
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : placeholderImage

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
