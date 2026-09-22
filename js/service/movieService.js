async function getMovies() {
  const response = await axios.get(API_URL);
  return response.data;
}

async function getMovieById(id) {
  const response = await axios.get(API_URL + "/" + id);
  return response.data;
}

async function addMovie(movie) {
  const response = await axios.post(API_URL, movie);
  return response.data;
}

async function updateMovie(id, movie) {
  const response = await axios.patch(API_URL + "/" + id, movie);
  return response.data;
}

async function deleteMovie(id) {
  await axios.delete(API_URL + "/" + id);
}