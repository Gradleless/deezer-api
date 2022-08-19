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

        return {
            "all_data": res //I don't have the permission lmao, I'll give it to myself later
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
}

module.exports = Me;