const DeezerAPI = require("../index");
const Dez = new DeezerAPI;
(async () => {
console.log((await Dez.artist.getArtist("27"))); // Daft Punk, I believe you know who they are, rlly
console.log((await Dez.artist.searchArtist("DAFT PUNK")))
})();