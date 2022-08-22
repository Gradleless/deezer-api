const Base = require("./base");

class Me extends Base {

    constructor() {
        super();
        this.urid = this.uri + "user/";
        this.suri = this.urid + "me/";
    }

    async getMyself(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri, { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.name,
            "lastname": res.lastname,
            "firstname": res.firstname,
            "status": res.status, // Have to check what's "status"
            "birthday": res.birthday,
            "inscription_date": res.inscription_date,
            "gender": res.gender,
            "link": res.link,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "country": res.country,
            "lang": res.lang,
            "is_kid": res.is_kid,
            "explicit_content_level": res.explicit_content_level,
            "explicit_content_levels_available": ["explicit_display", "explicit_no_recommendation", "explicit_hide"],
        }
    }

    async getPermissions(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "permissions", { params: { access_token: token } })).data;

        return {
            "permissions": res.permissions
        }
    }

    async getHistory(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "history", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "history": res.data,
            "nb_results": res.total
        }
    }

    async getPlaylists(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "playlists", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            "playlists": res.data,
            "nb_results": res.total
        }
    }

    async getPersonalSongs(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "personal_songs", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            "songs": res.data,
            "nb_results": res.total
        }
    }

    async getOptions(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "options", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            //"all_data": res,
            "streaming": res.streaming,
            "streaming_duration": res.streaming_duration,
            "offline": res.offline,
            "hq": res.hq,
            "ads_display": res.ads_display,
            "ads_audio": res.ads_audio,
            "too_many_devices": res.too_many_devices,
            "can_subscribe": res.can_subscribe,
            "radio_skips": res.radio_skips,
            "lossless": res.lossless,
            "preview": res.preview,
            "radio": res.radio,
            "type": res.type
        }
    }

    async getFollowers(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "followers", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            "followers": res.data,
            "nb_followers": res.total
        }
    }

    async getFollowings(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "followings", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            "followings": res.data,
            "nb_followings": res.total
        }
    }

    async getFavoriteArtists(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "artists", { params: { access_token: token } })).data;
        if(res.error) return res.error;

        return {
            "artists": res.data,
            "nb_artists": res.total,
            "checksum": res.checksum
        }
    }

    async getFavoriteAlbums(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "albums", { params: { access_token: token } })).data;
        if(res.error) return res.error; 

        return {
            "albums": res.data,
            "nb_albums": res.total,
            "checksum": res.checksum
        }
    }

    async getFavoritePodcasts(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "podcasts", { params: { access_token: token } })).data;
        if(res.error) return res.error; 

        return {
            "podcasts": res.data,
            "nb_podcasts": res.total,
            "checksum": res.checksum
        }
    }

    async getFavoriteRadios(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "radios", { params: { access_token: token } })).data;
        if(res.error) return res.error; 

        return {
            "radios": res.data,
            "nb_radios": res.total,
            "checksum": res.checksum
        }
    }  

    async sendNotification(token, message) {

        if(typeof token != "string" || typeof message != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.suri + "notifications", {data: {}}, { params: { access_token: token, message: message }})).data;
        if(res.error) return res.error;

        return `Success: ${res.success}`
    }

    async getFlow(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "flow", { params: { access_token: token }})).data;
        if(res.error) return res.error; 

        return {
            "flow": res.data,
            "nb_results": res.data.length,
        }
    } 

    /**
     * @name getCharts - Charts = Top tracks, albums, etc
     * @param {string} token - token of a user
     * @param {string} type - tracks, albums, artists or playlists
     */
    async getCharts(token, type) {

        if(typeof token != "string" || typeof type != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + `charts/${type}`, { params: { access_token: token }})).data;
        if(res.error) return res.error; 

        switch(type) {

            case "tracks":
            case "albums":
            case "artists":
            case "playlists":
                return {
                    "data": res.data,
                    "nb_results": res.total
                }            
            default:
                console.log("There's only 4 categories: tracks, albums, artists and playlists");
                break;
        }
    }

    /**
    * @name getRecommendations
    * @param {string} token - token of a user
    * @param {string} type - tracks, albums, artists, playlists, releases or radios
    */
    async getRecommendations(token, type) {

        if(typeof token != "string" || typeof type != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + `charts/${type}`, { params: { access_token: token }})).data;
        if(res.error) return res.error; 
    
        switch(type) {
    
            case "tracks":
            case "albums":
            case "artists":
            case "playlists":
            case "radios":
            case "releases":
                return {
                    "data": res.data,
                    "nb_results": res.total
                }            
            default:
                console.log("There's only 6 categories: tracks, albums, artists, playlists, releases or radios");
                break;
        }
    }

    async getFlow(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + "tracks", { params: { access_token: token }})).data;
        if(res.error) return res.error; 

        return {
            "tracks": res.data,
            "nb_results": res.data.length,
        }
    }
    
    async follow(token, user_id) {

        if(typeof token != "string" || typeof user_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.urid + "followings", { data: {}}, { params: { access_token: token, user_id: user_id }})).data;
        if(res.error) return res.error;

        return res;
    }

    async unfollow(token, user_id) {

        if(typeof token != "string" || typeof user_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.delete(this.urid + "followings", { params: { access_token: token, user_id: user_id }})).data;
        if(res.error) return res.error;

        return res;
    }
}

module.exports = Me;