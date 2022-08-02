const Track = require("./utils/tracks");
const Album = require("./utils/album");
const Artist = require("./utils/artist");

class DeezerAPI {

    constructor() {
        this.track = new Track;
        this.album = new Album;
        this.artist = new Artist;
    }
}
module.exports = DeezerAPI;