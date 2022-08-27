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

    constructor(token) {  
        
        this.token = null || token;
        this.track = new Track(this.token);
        this.album = new Album(this.token);
        this.artist = new Artist(this.token);
        this.playlist = new Playlist(this.token);
        this.genre = new Genre;
        this.episode = new Episode(this.token);
        this.infos = new Infos;
        this.podcast = new Podcast(this.token);
        this.charts = new Charts;
        this.editorial = new Editorial;
        this.oauth = new Oauth;
        this.me = new Me(this.token);
        this.user = new User(this.token);
        this.radio = new Radio(this.token);
    }
}
module.exports = DeezerAPI;