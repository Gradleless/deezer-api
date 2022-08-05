const Track = require("./utils/tracks");
const Album = require("./utils/album");
const Artist = require("./utils/artist");
const Playlist = require("./utils/playlist");
const Genre = require("./utils/genre");
const Episode = require("./utils/episode");

class DeezerAPI {

    constructor() {
        
        this.track = new Track;
        this.album = new Album;
        this.artist = new Artist;
        this.playlist = new Playlist;
        this.genre = new Genre;
        this.episode = new Episode;
    }
}
module.exports = DeezerAPI;