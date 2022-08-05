const Deezer = require("../index");
const Dez = new Deezer;

(async () => {
    console.log((await Dez.infos.getInfos()));
})();