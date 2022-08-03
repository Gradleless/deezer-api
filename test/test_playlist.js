const DeezerAPI = require("../index");
const Dez = new DeezerAPI;

(async () => {
console.log((await Dez.playlist.getPlaylist("3272614282")));
})();