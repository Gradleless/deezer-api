const DeezerAPI = require("../index");
const Dez = new DeezerAPI;
(async () => {
console.log((await Dez.album.getAlbum("321671087"))); // GARCON - Luther, yeah it's sorta advert
})();