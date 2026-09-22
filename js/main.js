requireLogin();

let movies = [];
let showFavoritesOnly = false;

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const ratingSort = document.getElementById("ratingSort");
const favoritesBtn = document.getElementById("favoritesBtn");
const movieModal = document.getElementById("movieModal");
const movieForm = document.getElementById("movieForm");
const message = document.getElementById("message");

document.addEventListener("DOMContentLoaded", loadMovies);

async function loadMovies() {
  try {
    movies = await getMovies();
    updateGenres();
    displayMovies();
  } catch (error) {
    message.textContent = "Server is not running. Start JSON Server first.";
  }
}

function updateGenres() {
  const selected = genreFilter.value;
  const genres = [...new Set(movies.map(movie => movie.genre))].sort();

  genreFilter.innerHTML = '<option value="all">All Genres</option>';

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });

  genreFilter.value = genres.includes(selected) ? selected : "all";
}

function displayMovies() {
  let result = [...movies];

  const searchText = searchInput.value.toLowerCase().trim();
  const genre = genreFilter.value;

  if (searchText) {
    result = result.filter(movie =>
      movie.title.toLowerCase().includes(searchText)
    );
  }

  if (genre !== "all") {
    result = result.filter(movie => movie.genre === genre);
  }

  if (showFavoritesOnly) {
    result = result.filter(movie => movie.favorite);
  }

  if (ratingSort.value === "high") {
    result.sort((a, b) => b.rating - a.rating);
  }

  if (ratingSort.value === "low") {
    result.sort((a, b) => a.rating - b.rating);
  }

  document.getElementById("movieCount").textContent = result.length;

  if (result.length === 0) {
    movieList.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movieList.innerHTML = result.map(movie => `
    <article class="movie-card">
      <img class="movie-poster"
           src="${safeImage(movie.poster)}"
           alt="${escapeHtml(movie.title)}"
           onerror="this.src='https://via.placeholder.com/500x700?text=No+Poster'">

      <div class="movie-body">
        <h3>${escapeHtml(movie.title)}</h3>
        <p class="meta">${escapeHtml(movie.genre)} • ${movie.releaseYear} • ${escapeHtml(movie.language)}</p>
        <p class="rating">★ ${movie.rating}/10</p>

        <div class="card-actions">
          <button onclick="viewMovie(${movie.id})">Details</button>
          <button onclick="editMovie(${movie.id})">Edit</button>
          <button onclick="removeMovie(${movie.id})">Delete</button>
        </div>

        <div class="card-actions">
          <button class="${movie.favorite ? "favorite" : ""}"
                  onclick="toggleFavorite(${movie.id}, ${movie.favorite})">
            ${movie.favorite ? "★ Favorite" : "☆ Favorite"}
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function viewMovie(id) {
  window.location.href = "details.html?id=" + id;
}

function openModal() {
  movieModal.classList.remove("hidden");
}

function closeModal() {
  movieModal.classList.add("hidden");
  movieForm.reset();
  document.getElementById("movieId").value = "";
  document.getElementById("formTitle").textContent = "Add Movie";
}

document.getElementById("addMovieBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);

movieModal.addEventListener("click", function(event) {
  if (event.target === movieModal) {
    closeModal();
  }
});

movieForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const id = document.getElementById("movieId").value;

  const movie = {
    title: document.getElementById("title").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    releaseYear: Number(document.getElementById("releaseYear").value),
    language: document.getElementById("language").value.trim(),
    rating: Number(document.getElementById("rating").value),
    duration: document.getElementById("duration").value.trim(),
    description: document.getElementById("description").value.trim(),
    poster: document.getElementById("poster").value.trim(),
    favorite: id ? movies.find(item => item.id == id).favorite : false
  };

  try {
    if (id) {
      await updateMovie(id, movie);
      message.textContent = "Movie updated successfully.";
    } else {
      await addMovie(movie);
      message.textContent = "Movie added successfully.";
    }

    closeModal();
    await loadMovies();
  } catch (error) {
    message.textContent = "Something went wrong while saving the movie.";
  }
});

async function editMovie(id) {
  const movie = movies.find(item => item.id === id);
  if (!movie) return;

  document.getElementById("movieId").value = movie.id;
  document.getElementById("title").value = movie.title;
  document.getElementById("genre").value = movie.genre;
  document.getElementById("releaseYear").value = movie.releaseYear;
  document.getElementById("language").value = movie.language;
  document.getElementById("rating").value = movie.rating;
  document.getElementById("duration").value = movie.duration;
  document.getElementById("poster").value = movie.poster;
  document.getElementById("description").value = movie.description;

  document.getElementById("formTitle").textContent = "Edit Movie";
  openModal();
}

async function removeMovie(id) {
  const movie = movies.find(item => item.id === id);

  if (!movie) return;

  if (!confirm("Delete " + movie.title + "?")) {
    return;
  }

  try {
    await deleteMovie(id);
    message.textContent = "Movie deleted successfully.";
    await loadMovies();
  } catch (error) {
    message.textContent = "Could not delete movie.";
  }
}

async function toggleFavorite(id, currentValue) {
  try {
    await updateMovie(id, { favorite: !currentValue });
    await loadMovies();
  } catch (error) {
    message.textContent = "Could not update favorite.";
  }
}

searchInput.addEventListener("input", displayMovies);
genreFilter.addEventListener("change", displayMovies);
ratingSort.addEventListener("change", displayMovies);

favoritesBtn.addEventListener("click", function() {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesBtn.textContent = showFavoritesOnly ? "★ Showing Favorites" : "★ Favorites";
  displayMovies();
});