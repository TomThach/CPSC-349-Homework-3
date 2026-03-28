const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const { title, poster_path, vote_average, release_date } = movie;
  const posterUrl = poster_path
    ? IMG_PATH + poster_path
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} />
      <h3>{title}</h3>
      <p>Release Date: {release_date || 'N/A'}</p>
      <p>Rating: {vote_average}</p>
    </div>
  );
}

export default MovieCard