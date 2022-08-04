const Base = require("./base");

class Track extends Base {

    constructor() {
        super();
        this.urid = this.uri + "track/";
        this.suri = this.uri + "search/track?q=";
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
            "duration": this.convertDuration(res.duration),
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

    async searchTrack(track, artist) {

        if(typeof track != "string") return console.log("It must be a String !");
        if(!artist) {

            const res = (await this.axios.get(this.suri + `"${track}"`)).data;
            return res;

        } else if(typeof artist == "string") {

            const res = (await this.axios.get(this.suri + `artist:"${artist}" track:"${track}"`)).data;
            const ress = res.data[0];

            if(res.data.length == 1) {

                return {
                    "id": ress.id,
                    "readable": ress.readable,
                    "title": ress.title,
                    "title_short": ress.title_short,
                    "title_version": ress.title_version,
                    "link": ress.link,
                    "duration": this.convertDuration(ress.duration),
                    "rank": ress.rank,
                    "explicit_lyrics": ress.explicit_lyrics,
                    "explicit_content_lyrics": ress.explicit_content_lyrics,
                    "explicit_content_cover": ress.explicit_content_cover,
                    "preview": ress.preview,
                    "md5_image": ress.md5_image,
                    "artist": {
                        "id": ress.artist.id,
                        "name": ress.artist.name,
                        "link": ress.artist.link,
                        "picture": {
                            "small": ress.artist.picture_small,
                            "medium": ress.artist.picture_medium,
                            "big": ress.artist.picture_big,
                            "xl": ress.artist.picture_xl
                        },
                        "tracklist": ress.artist.tracklist,
                        "type": ress.artist.type,
                    },
                    "album": {
                        "id": ress.album.id,
                        "title": ress.album.title,
                        "cover": {
                            "small": ress.album.cover_small,
                            "medium": ress.album.cover_medium,
                            "big": ress.album.cover_big,
                            "xl": ress.album.cover_xl
                        },
                        "md5_image": ress.album.md5_image,
                        "tracklist": ress.album.tracklist,
                        "type": ress.album.type // it's useless but... Yeah idk
                    }
                }

            } else {

                return {
                    "data": res.data,
                    "nb_results": res.total
                }
            }
            
        } else {

            return console.log("It must be a String !");
        }       
    }

    async searchArtistTracks(name) {

        if(typeof name != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.suri + `artist:"${name}"`)).data;

        return {
            "data": res.data,
            "nb_results": res.total
        }       
    }
}

module.exports = Track;
