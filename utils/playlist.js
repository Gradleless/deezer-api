const Base = require("./base");

class Playlist extends Base {

    constructor() {
        super();
        this.urid = this.uri + "playlist/";
        this.suri = this.uri + "search/playlist?q=";
    }
    
    /**
     * @name getPlaylist
     * @param {string} id 
     */
    async getPlaylist(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.title,
            "link": res.link,
            "share": res.share,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "nb_tracks": res.nb_tracks,
            "isPublic": res.public,
            "isLovedTrack": res.is_loved_track,
            "unseen_track_count": res.unseen_track_count,
            "checksum": res.checksum,
            "creator": res.creator,
            "tracks": res.tracks.data
        }     
    }

    /**
     * @name searchPlaylist
     * @param {string} name 
     */
    async searchPlaylist(name) {

        if(typeof name != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + name)).data;
        return {
            "data": res.data,
            "nb_results": res.total
        }
    }

    /**
     * @name getoEmbed
     * @param {string} id 
     * @param {boolean} autoplay - (optional) Play the music on load
     * @param {int} maxwidth - (optional) Maximum width of the resource
     * @param {int} maxheight - (optional) Maximum height of the resource
     * @param {boolean} radius - (optional) Radius visual effect
     * @param {boolean} tracklist - (optional) Display the tracklist 
    */
     async getoEmbed(id, data = { autoplay: false, maxwidth: 420, maxheight: 420, radius: true, tracklist: false }) {

        if(typeof id != "string") return console.log("It must be a string value !");

        const params = `/&autoplay=${data.autoplay}&maxwidth=${data.maxwidth}&maxheight=${data.maxheight}&radius=${data.radius}&tracklist=${data.tracklist}`
        const res = (await this.axios.get(this.uri + "oembed?url=https://www.deezer.com/playlist/" + id + params)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "version": res.version,
            "type": res.type,
            "cache_age": res.cache_age,
            "provider": {
                "name": res.provider_name,
                "url": res.provider_url
            },
            "entity": res.entity,
            "id": res.id,
            "url": res.url,
            "author_name": res.author_name,
            "title": res.title,
            "thumbnail": {
                "url": res.thumbnail_url,
                "width": res.thumbnail_width,
                "height": res.thumbnail_height
            },
            "required_width": res.width,
            "required_height": res.height,
            "oembed": res.html
        }
    }

    async addFavorite(token, playlist_id) {

        if(typeof token != "string" || typeof playlist_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.uri + "/user/me/playlists", { data: {}}, { params: { access_token: token, playlist_id: playlist_id }})).data;
        if(res.error) return res.error;

        return res;
    }

    /**
     * @name addTracks
     * @param {string} token 
     * @param {array} tracks_id - Array of string tracks id
     * @param {string} playlist_id 
     */
    async addTracks(token, tracks_id, playlist_id) {

        if(typeof token != "string" || typeof playlist_id != "string") return console.log("It must be a string value !");
        if(!Array.isArray(tracks_id)) return console.log("tracks_id must be an array of string !");
        const res = (await this.axios.post(this.urid + `${playlist_id}/tracks`, { data: {}}, { params: { access_token: token, songs: tracks_id.toString() }})).data;
        if(res.error) return res.error;

        return res;
    }

    /**
     * @name orderTracks
     * @param {string} token 
     * @param {array} tracks_id - Array of string tracks id
     * @param {string} playlist_id 
     */
    async orderTracks(token, tracks_id, playlist_id) {

        if(typeof token != "string" || typeof playlist_id != "string") return console.log("It must be a string value !");
        if(!Array.isArray(tracks_id)) return console.log("tracks_id must be an array of string !");
        const res = (await this.axios.post(this.urid + `${playlist_id}/tracks`, { data: {}}, { params: { access_token: token, order: tracks_id.toString() }})).data;
        if(res.error) return res.error;

        return res;
    }

    async seen(token, playlist_id) {

        if(typeof token != "string" || typeof playlist_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.urid + `${playlist_id}/seen`, { data: {}}, { params: { access_token: token }})).data;
        if(res.error) return res.error;

        return res;
    }
}

module.exports = Playlist;
