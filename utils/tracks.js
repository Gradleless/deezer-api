const Base = require("./base");

class Track extends Base {

    constructor(id) {
        super();
        this.urid = this.uri + "track/";
    }
    
    async getTrack(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.id == undefined) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "title": res.title,
            "title_short": res.title_short,
            "title_version": res.title_version,
            "isrc": res.isrc,
            "share": res.share,
            "link": res.link,
            "duration": res.duration,
            "album": {
                "track_position": res.track_position,
                "id": res.album.id,
                "title": res.album.title,
                "link": res.album.link,
                "release_date": res.album.release_date,
                "tracklist": res.album.tracklist,
                "cover": {
                    "small": res.album.cover_small,
                    "medium": res.album.cover_medium,
                    "big": res.album.cover_big,
                    "xl": res.album.cover_xl
                },
            },
            "rank": res.rank,
            "release_date": res.release_date,
            "explicit_lyrics": res.explicit_lyrics,
            "explicit_content_lyrics": res.explicit_content_lyrics,
            "explicit_content_cover": res.explicit_content_cover,
            "preview": res.preview,
            "bpm": res.bpm,
            "gain": res.gain,
            "available_countries": res.available_countries,
            "alternative_track": res.alternative,
            "contributors": res.contributors,
            "md5_image": res.md5_image,
            "artist": {
                "id": res.artist.id,
                "name": res.artist.name,
                "link": res.artist.link,
                "share": res.artist.share,
                "picture": {
                    "small": res.artist.picture_small,
                    "medium": res.artist.picture_medium,
                    "big": res.artist.picture_big,
                    "xl": res.artist.picture_xl
                },
                "radio": res.artist.radio,
                "tracklist": res.artist.tracklist
            }
        }       
    }
}

module.exports = Track;
