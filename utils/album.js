const Base = require("./base");
const Genre = require("./genre");

class Album extends Base {

    constructor() {
        super();
        this.genre = new Genre;
        this.urid = this.uri + "album/";
        this.suri = this.uri + "search/album?q=";
    }
    
    /**
     * @name getAlbum
     * @param {string} id 
     */
    async getAlbum(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

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

    /**
     * @name searchAlbum
     * @param {string} album 
     * @param {string} artist 
     */
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
        const res = (await this.axios.get(this.uri + "oembed?url=https://www.deezer.com/album/" + id + params)).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

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

    async addFavorite(token, album_id) {

        if(typeof token != "string" || typeof album_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.uri + "/user/me/albums", { data: {}}, { params: { access_token: token, album_id: album_id }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }

    async deleteFavorite(token, album_id) {

        if(typeof token != "string" || typeof album_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.delete(this.uri + "/user/me/albums", { params: { access_token: token, album_id: album_id }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }
}

module.exports = Album;
