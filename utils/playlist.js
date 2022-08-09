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
        if(res.id == undefined) return res.error;

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
}

module.exports = Playlist;
