const Base = require("./base");
const Genre = require("./genre");

class Album extends Base {

    constructor() {
        super();
        this.genre = new Genre;
        this.urid = this.uri + "album/";
        this.suri = this.uri + "search/album?q=";
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

    async searchAlbum(album, artist) {

        if(typeof album != "string") return console.log("It must be a String !");
        if(!artist) {

            const res = (await this.axios.get(this.suri + `"${album}"`)).data;
            return res;

        } else if(typeof artist == "string") {

            const res = (await this.axios.get(this.suri + `artist:"${artist}" album:"${album}"`)).data;
            const ress = res.data[0];

            if(res.data.length == 1) {
                const genreprop = (await this.genre.getGenre(`${ress.genre_id}`));

                return {
                    "id": ress.id,
                    "title": ress.title,
                    "link": ress.link,
                    "explicit_lyrics": ress.explicit_lyrics,
                    "cover": {
                        "small": ress.cover_small,
                        "medium": ress.cover_medium,
                        "big": ress.cover_big,
                        "xl": ress.cover_xl
                    },
                    "md5_image": ress.md5_image,
                    "genre_id": ress.genre_id,
                    "genre": {
                        "id": ress.genre_id,
                        "name": genreprop.name,
                        "picture": {
                            "small": genreprop.picture.small,
                            "medium": genreprop.picture.medium,
                            "big": genreprop.picture.big,
                            "xl": genreprop.picture.xl
                        },
                        "type": genreprop.type
                    },
                    "nb_tracks": ress.nb_tracks,
                    "record_type": ress.record_type,
                    "tracklist": ress.tracklist,
                    "type": ress.type,
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
}

module.exports = Album;
