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

addEventListener('input', function() {
    var searchInput;

    if(this.document.body.clientWidth < 800) {
        searchInput = document.getElementById('search-input-mobile');
    } else {
        searchInput = document.getElementById('search-input');
    }

    const artistName = searchInput.value.toLowerCase();
    console.log(artistName);
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
    var artistName = document.getElementById('artist-name');
    var artistImage = document.getElementById('artist-img');

    artists.forEach(element => {
        artistName.textContent = element.name;
        artistImage.src = element.urlImg;
    });

    searchList.classList.remove("hidden");
}