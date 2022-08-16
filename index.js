const Track = require("./utils/tracks");
const Album = require("./utils/album");
const Artist = require("./utils/artist");
const Playlist = require("./utils/playlist");
const Genre = require("./utils/genre");
const Episode = require("./utils/episode");
const Infos = require("./utils/infos");
const Podcast = require("./utils/podcast");
const Charts = require("./utils/chart");
const Editorial = require("./utils/editorial");
const Oauth = require("./utils/oauth");

class DeezerAPI {

    constructor() {       
        this.track = new Track;
        this.album = new Album;
        this.artist = new Artist;
        this.playlist = new Playlist;
        this.genre = new Genre;
        this.episode = new Episode;
        this.infos = new Infos;
        this.podcast = new Podcast;
        this.charts = new Charts;
        this.editorial = new Editorial;
        this.oauth = new Oauth;
    }
}
module.exports = DeezerAPI;