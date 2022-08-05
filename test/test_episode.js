const Deezer = require("../index");
const Dez = new Deezer;

(async () => {
    console.log((await Dez.episode.getEpisode("397805987")));
})();