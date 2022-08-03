const Base = require("./base");

class Playlist extends Base {

    constructor(id) {
        super();
        this.urid = this.uri + "playlist/";
    }
    
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
}

module.exports = Playlist;
