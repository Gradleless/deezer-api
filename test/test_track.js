const DeezerAPI = require("../index");
const Dez = new DeezerAPI;
(async () => {
console.log((await Dez.track.getTrack("1785191677"))); // = NOIR - Hakai if ya wish to know
console.log((await Dez.track.searchTrack("NOIR", "HAKAI")))
})();