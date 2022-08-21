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
const Me = require("./utils/me");
const User = require("./utils/user");
const Radio = require("./utils/radio");

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
        this.me = new Me;
        this.user = new User;
        this.radio = new Radio;
    }
}
module.exports = DeezerAPI;