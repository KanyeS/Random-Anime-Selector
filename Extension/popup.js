// Function to fetch a random anime from the Jikan API (using the provided random anime endpoint)
async function fetchRandomAnime() {
    try {
      // Fetch a random anime from the Jikan API
      const response = await fetch('https://api.jikan.moe/v4/random/anime');
      const data = await response.json();
      return data.data; // Return the anime data
    } catch (error) {
      console.error('Error fetching random anime:', error);
      return null;
    }
  }
  
  // Function to display the random anime in the popup
  async function displayRandomAnime() {
    const anime = await fetchRandomAnime();
    if (anime) {
      // Set the anime title, image, and synopsis in the popup
      document.getElementById('anime-title').textContent = anime.title;
      document.getElementById('anime-image').src = anime.images.jpg.image_url;
      document.getElementById('anime-synopsis').textContent = anime.synopsis ? anime.synopsis : 'No synopsis available.';
      
      // Set the anime URL so the user can go to the MyAnimeList page for more details
      const animeUrl = document.getElementById('anime-url');
      animeUrl.href = anime.url;
      animeUrl.textContent = 'View on MyAnimeList';
    } else {
      document.getElementById('anime-title').textContent = 'Failed to load anime. Try again!';
      document.getElementById('anime-image').src = ''; // Clear the image
      document.getElementById('anime-synopsis').textContent = '';
      document.getElementById('anime-url').textContent = '';
    }
  }
  
  // Event listener to handle page load and button clicks
  document.addEventListener('DOMContentLoaded', () => {
    // Display a random anime when the popup is opened
    displayRandomAnime();
  
    // Add a click listener for the refresh button to get another random anime
    document.getElementById('refresh').addEventListener('click', () => {
      displayRandomAnime();
    });
  });
  