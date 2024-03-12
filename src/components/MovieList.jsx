import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import Modal from './Modal'
import '../styles/MovieList.css'

const MovieList = ({ query, filter }) => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchMovies();
  }, [page, query, filter])

  const fetchMovies = async () => {
    const apiKey = import.meta.env.VITE_API_KEY
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${filter}&page=${page}`

    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
    }

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (page > 1) {
        setMovies(prev => [
          ...prev,
          ...data.results
        ])
      } else {
        setMovies(data.results)
      }
    } catch (error) {
      console.error("Error fetching movies:", error)
    }
  }

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleCardClick = async (movieId) => {
    const apiKey = import.meta.env.VITE_API_KEY
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`

    try {
      const detailsResponse = await fetch(detailsUrl)
      const details = await detailsResponse.json()
      if (!detailsResponse.ok) {
        throw new Error(`HTTP error! Status: ${detailsResponse.status}`)
      }

      const videosResponse = await fetch(videosUrl)
      const videos = await videosResponse.json()
      if (!videosResponse.ok) {
        throw new Error(`HTTP error! Status: ${videosResponse.status}`)
      }

      const trailer = videos.results.find(video => video.site === "YouTube" && video.type === "Trailer")
      const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null

      setSelectedMovie({...details, trailerUrl})
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error fetching movie details or trailers:", error)
    }
  }

  return (
    <div>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} onClick={() => handleCardClick(movie.id)}>
            <MovieCard
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          </div>
        ))}
      </div>

      <button onClick={loadMore}>Load More</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="movie-details">
            <h2>{selectedMovie?.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie?.backdrop_path}`} alt={selectedMovie?.title} />
            <p><strong>Release Date:</strong> {selectedMovie?.release_date}</p>
            <p><strong>Overview:</strong> {selectedMovie?.overview}</p>
            <p><strong>Genres:</strong> {selectedMovie?.genres.map(genre => genre.name).join(', ')}</p>
            {selectedMovie?.trailerUrl && (
                <iframe
                  src={selectedMovie.trailerUrl}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Movie Trailer"
                  width="560" height="315"
                ></iframe>
            )}
        </div>
      </Modal>
    </div>
  )
}

export default MovieList
