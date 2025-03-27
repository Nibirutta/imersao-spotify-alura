const searchInput = document.getElementById('search-input');
const searchList = document.getElementById('search-list');
const currentPlaylist = document.getElementById('current-playlist');

document.getElementById("sidebar-hide-button").addEventListener("click", function() {
    document.getElementById("sidebar-content").classList.add("hidden");
});

/*
addEventListener('input', function() {
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
}*/