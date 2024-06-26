const Base = require("./base");

class Track extends Base {

    constructor(token) {
        super();
        this.token = token;
        this.urid = this.uri + "track/";
        this.suri = this.uri + "search/track?q=";
    }
    
    formatTrackResponse(res) {
        return {
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
        };
    }

    async fetchWrapper(url, options = {}) {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.error) {
            console.log(data.error.message + ` code: ${data.error.code}`);
            return null;
        }
        return data;
    }

    /**
     * @name getTrack
     * @param {string} id 
     */
    async getTrack(id) {
        if (typeof id !== "string") {
            console.log("It must be a String value !");
            return null;
        }
        const res = await this.fetchWrapper(this.urid + id);
        if (!res) return;

        return this.formatTrackResponse(res);
    }

    /**
     * @name searchTrack
     * @param {string} track 
     * @param {string} artist 
     */
    async searchTrack(track, artist) {
        if (typeof track !== "string") {
            console.log("It must be a String !");
            return null;
        }
        let url = this.suri + `"${track}"`;
        if (artist) {
            if (typeof artist !== "string") {
                console.log("Artist must be a String !");
                return null;
            }
            url = this.suri + `artist:"${artist}" track:"${track}"`;
        }
        const res = await this.fetchWrapper(url);
        if (!res) return;

        if (artist && res.data.length === 1) {
            const ress = res.data[0];
            return this.formatTrackResponse(ress);
        } else {
            return {
                "data": res.data,
                "nb_results": res.total
            };
        }
    }

    /**
     * @name searchArtistTracks
     * @param {string} name 
     */
    async searchArtistTracks(name) {
        if (typeof name !== "string") {
            console.log("It must be a String value !");
            return null;
        }
        const res = await this.fetchWrapper(this.suri + `artist:"${name}"`);
        if (!res) return;

        return {
            "data": res.data,
            "nb_results": res.total
        };
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
        if (typeof id !== "string") {
            console.log("It must be a string value !");
            return null;
        }
        const params = `/&autoplay=${data.autoplay}&maxwidth=${data.maxwidth}&maxheight=${data.maxheight}&radius=${data.radius}&tracklist=${data.tracklist}`;
        const res = await this.fetchWrapper(this.uri + "oembed?url=https://www.deezer.com/track/" + id + params);
        if (!res) return;

        return {
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
        };
    }

    async modifyFavorite(method, track_id) {
        if (typeof track_id !== "string") {
            console.log("It must be a string value !");
            return null;
        }
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ track_id: track_id })
        };
        const url = this.uri + "/user/me/tracks?access_token=" + this.token;
        const res = await this.fetchWrapper(url, options);
        return res;
    }

    async addFavorite(track_id) {
        return this.modifyFavorite('POST', track_id);
    }

    async deleteFavorite(track_id) {
        return this.modifyFavorite('DELETE', track_id);
    }

    async update(track_id) {
        if (typeof track_id !== "string") {
            console.log("It must be a string value !");
            return null;
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };
        const res = await this.fetchWrapper(this.urid + track_id, options);
        return res;
    }

    async delete(track_id) {
        if (typeof track_id !== "string") {
            console.log("It must be a string value !");
            return null;
        }
        const options = {
            method: 'DELETE'
        };
        const res = await this.fetchWrapper(this.urid + track_id, options);
        return res;
    }
}

module.exports = Track;


