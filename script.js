// script.js for browser
document.addEventListener("DOMContentLoaded", function () {
    const citySelect = document.getElementById("citySelect");
  
    // Fetch city data using fetch API
    fetch('all-countries-and-cities-json/cities.json')
      .then((response) => response.json())
      .then((cities) => {
        // Populate the dropdown with city options
        cities.forEach((city) => {
          const option = document.createElement("option");
          option.value = city;
          option.textContent = city;
          citySelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  });
  