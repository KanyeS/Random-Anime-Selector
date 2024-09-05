// Function to fetch a random anime from the Jikan API
async function fetchRandomAnime() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/random/anime');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching random anime:', error);
    return null;
  }
}

// Function to display random anime
async function displayRandomAnime() {
  const anime = await fetchRandomAnime();
  if (anime) {
    document.getElementById('anime-title').textContent = anime.title;
    document.getElementById('anime-image').src = anime.images.jpg.image_url;
    document.getElementById('anime-synopsis').textContent = anime.synopsis || 'No synopsis available.';
    document.getElementById('anime-url').href = anime.url;
    document.getElementById('anime-genres').innerHTML = anime.genres.map(genre => `<li>${genre.name}</li>`).join('');
  } else {
    document.getElementById('anime-title').textContent = 'Failed to load anime. Try again!';
  }
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
  displayRandomAnime();

  // Switch to Genre Search View
  document.getElementById('switch-to-genre').addEventListener('click', () => {
    document.getElementById('random-anime-container').style.display = 'none';
    document.getElementById('genre-search-container').style.display = 'block';
  });

  // Switch back to Random Anime View
  document.getElementById('switch-to-random').addEventListener('click', () => {
    document.getElementById('genre-search-container').style.display = 'none';
    document.getElementById('random-anime-container').style.display = 'block';
  });

  // Add a click listener for the refresh button to get another random anime
  document.getElementById('refresh').addEventListener('click', () => {
    displayRandomAnime();
  });

  // Handle genre search
  document.getElementById('search-genre').addEventListener('click', async () => {
    const genreInput = document.getElementById('genre-input').value;
    const resultContainer = document.getElementById('genre-result');
    resultContainer.innerHTML = 'Searching...';

    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreInput}&limit=10`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        // Randomly select one anime from the result
        const randomAnime = data.data[Math.floor(Math.random() * data.data.length)];
        resultContainer.innerHTML = `
          <h2>${randomAnime.title}</h2>
          <img src="${randomAnime.images.jpg.image_url}" alt="${randomAnime.title}" class="img-fluid">
          <p>${randomAnime.synopsis || 'No synopsis available.'}</p>
          <a href="${randomAnime.url}" target="_blank" class="btn btn-primary">View on MyAnimeList</a>
        `;
      } else {
        resultContainer.innerHTML = 'No results found.';
      }
    } catch (error) {
      resultContainer.innerHTML = 'Error fetching results.';
      console.error('Error searching by genre:', error);
    }
  });
});
