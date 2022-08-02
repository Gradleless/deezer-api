const Base = require("./base");

class Album extends Base {

    constructor(id) {
        super();
        this.urid = this.uri + "album/";
    }
    
    async getAlbum(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.id == undefined) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "genre_id": res.genre_id,
            "genres": res.genres.data,
            "title": res.title,
            "upc": res.upc,
            "share": res.share,
            "link": res.link,
            "duration": res.duration,
            "release_date": res.release_date,
            "fans": res.fans,
            "nb_tracks": res.nb_tracks,
            "label": res.label,
            "record_type": res.record_type,
            "cover": {
                "small": res.cover_small,
                "medium": res.cover_medium,
                "big": res.cover_big,
                "xl": res.cover_xl
            },
            "explicit_lyrics": res.explicit_lyrics,
            "explicit_content_lyrics": res.explicit_content_lyrics,
            "explicit_content_cover": res.explicit_content_cover,
            "available": res.available,
            "alternative_track": res.alternative,
            "tracklist": res.tracklist,
            "contributors": res.contributors,
            "md5_image": res.md5_image,
            "artist": {
                "id": res.artist.id,
                "name": res.artist.name,
                "picture": {
                    "small": res.artist.picture_small,
                    "medium": res.artist.picture_medium,
                    "big": res.artist.picture_big,
                    "xl": res.artist.picture_xl
                },
            },
            "tracks": res.tracks.data
        }       
    }
}

module.exports = Album;
