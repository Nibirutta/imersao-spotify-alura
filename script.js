const sidebarButton = document.getElementById('sidebar-hide-button');
const searchList = document.getElementById('search-list');
const currentPlaylist = document.getElementById('current-playlist');
var buttonState = false;

// Esconde e revela a sidebar ao cliclar no botão
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

// Verifa constantemente o tamanho da tela do usuário e mantém a searchbar atualizada
addEventListener('resize', syncSearchInputs);

// Ao inserir algum nome na searchbar, realiza a pesquisa do artista correspondente
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

// Procura pelos dados na api
async function requestApi(artistName) {
    // API simulada localmente
    //const url = `http://localhost:3000/artists`;
    // API simulada via jsonbin
    const url = "https://api.jsonbin.io/v3/b/67ee6ee98561e97a50f7f8b4";
    const apiKey = "$2a$10$eQXImx2J5dORy49Nxbp.3.uZGQM/WUCU9qtp/wOW2MUmLHn5JCnQG";

    try {
        const response = await fetch(url, {
            headers: {
                'X-Access-Key': apiKey
            }
        });

        if(!response.ok){
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        const artists = data.record.artists;

        const filteredData = artists.filter(artist => 
            artist.name.toLowerCase().includes(artistName.toLowerCase())
        );

        displayArtists(filteredData);
    } catch(error) {
        console.log(`Falha na requisição dos dados, dado ao ${error}`);
    }
}

// Posiciona os artistas correspondentes na lista
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

// Realiza a sincronização da searchbar
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