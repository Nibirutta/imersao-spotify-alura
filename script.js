const sidebarButton = document.getElementById('sidebar-hide-button');
const searchList = document.getElementById('search-list');
const currentPlaylist = document.getElementById('current-playlist');
var buttonState = false;

document.getElementById("sidebar-hide-button").addEventListener("click", function() {
    if(buttonState === false) {
        document.getElementById("sidebar").style.width = "60%";
        document.getElementById("sidebar-content").style.width = "100%";
        buttonState = true;
    } else {
        document.getElementById("sidebar").style.width = "0%";
        document.getElementById("sidebar-content").style.width = "0%";
        buttonState = false;
    }
});

addEventListener('resize', syncSearchInputs);

addEventListener('input', function() {
    var searchInput;

    if(this.document.body.clientWidth < 800) {
        searchInput = document.getElementById('search-input-mobile');
    } else {
        searchInput = document.getElementById('search-input');
    }

    const artistName = searchInput.value.toLowerCase();

    if(artistName === '') {
        currentPlaylist.classList.add('hidden');
        searchList.classList.remove('hidden');

        return;
    }

    requestApi(artistName);
});

function requestApi(artistName) {
    const url = `http://localhost:3000/artists`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const filteredData = data.filter((artist) => artist.name.toLowerCase().includes(artistName));
            console.log(filteredData);
            displayArtists(filteredData);
        })
}

function displayArtists(artists) {
    currentPlaylist.classList.add("hidden");
    var artistContainer = document.getElementById("artist-container");

    artistContainer.innerHTML = "";

    artists.forEach(artist => {
        var artistCard = document.createElement("li");
        artistCard.className = "artist-card";

        artistCard.innerHTML = `
        <div class="card-img">
            <img class="artist-img" src="${artist.urlImg}">
            <span class="fa fa-solid fa-play"></span>
        </div>
        <div class="card-text">
            <a title="${artist.name}" class="vst" href="">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-category">${artist.genre || "Artist"}</span>
            </a>
        </div>
        `;

        artistContainer.appendChild(artistCard);
    });

    searchList.classList.remove("hidden");
}

function syncSearchInputs() {
    var activeInput = document.body.clientWidth < 800
    ? document.getElementById("search-input-mobile")
    : document.getElementById("search-input");

    var searchValue = activeInput.value;

    document.querySelectorAll(".search-input").forEach(input => {
        if (input !== activeInput) {
            input.value = searchValue;
        }
    });
}