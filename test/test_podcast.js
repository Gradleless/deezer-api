const DeezerAPI = require("../index");
const dez = new DeezerAPI;

(async () => {
console.log((await dez.podcast.searchPodcast("Somnifere le podcast pour s'endormir")));
console.log((await dez.podcast.getPodcast("1728602"))); // It's the same podcast 
})();