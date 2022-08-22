const Base = require("./base");

class Track extends Base {

    constructor() {
        super();
        this.urid = this.uri + "track/";
        this.suri = this.uri + "search/track?q=";
    }
    
    /**
     * @name getTrack
     * @param {string} id 
     */
    async getTrack(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

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

    /**
     * @name searchTrack
     * @param {string} track 
     * @param {string} artist 
     */
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

    /**
     * @name searchArtistTracks
     * @param {string} name 
     */
    async searchArtistTracks(name) {

        if(typeof name != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.suri + `artist:"${name}"`)).data;

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
        const res = (await this.axios.get(this.uri + "oembed?url=https://www.deezer.com/track/" + id + params)).data;
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

    async addFavorite(token, track_id) {

        if(typeof token != "string" || typeof track_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.uri + "/user/me/tracks", { data: {}}, { params: { access_token: token, track_id: track_id }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }

    async deleteFavorite(token, track_id) {

        if(typeof token != "string" || typeof track_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.delete(this.uri + "/user/me/tracks", { params: { access_token: token, track_id: track_id }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }

    async update(token, track_id) {

        if(typeof token != "string" || typeof track_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.urid + track_id, { data: {}}, { params: { access_token: token }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;

        /*
        * idk how really work update of its own tracks (like, I dont have tracks bro even if I want to make music) 
        * so I hope I have nothing to add besides that 
        * (if someone use this function one day pls give me an answer bro)
        */
    }

    async delete(token, track_id) {

        if(typeof token != "string" || typeof track_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.delete(this.urid + track_id, { params: { access_token: token }})).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

        return res;
    }
}

module.exports = Track;
