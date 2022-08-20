const Base = require("./base");

class User extends Base {

    constructor() {
        super();
        this.urid = this.uri + "user/";
    }

    async getUser(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.name,
            "link": res.link,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "country": res.country,
            "tracklist": res.tracklist,
            "type": res.type
        }
    }

    async getPlaylists(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "playlists")).data;
        if(res.error) return res.error;

        return {
            "playlists": res.data,
            "nb_results": res.total
        }
    }

    async getFollowers(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "followers")).data;
        if(res.error) return res.error;

        return {
            "followers": res.data,
            "nb_followers": res.total
        }
    }

    async getFollowings(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "followings")).data;
        if(res.error) return res.error;

        return {
            "followings": res.data,
            "nb_followings": res.total
        }
    }

    async getFavoriteArtists(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "artists")).data;
        if(res.error) return res.error;

        return {
            "artists": res.data,
            "nb_artists": res.total,
            "checksum": res.checksum
        }
    }

    async getFavoriteAlbums(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "albums")).data;
        if(res.error) return res.error; 

        return {
            "albums": res.data,
            "nb_albums": res.total,
            "checksum": res.checksum
        }
    }

    async getFavoritePodcasts(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "podcasts")).data;
        if(res.error) return res.error; 

        return {
            "podcasts": res.data,
            "nb_podcasts": res.total,
            "checksum": res.checksum
        }
    }

    async getFavoriteRadios(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "radios")).data;
        if(res.error) return res.error; 

        return {
            "radios": res.data,
            "nb_radios": res.total,
            "checksum": res.checksum
        }
    } 

    async getFlow(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "flow")).data;
        if(res.error) return res.error; 

        return {
            "flow": res.data,
            "nb_results": res.data.length,
        }
    } 

    /**
     * @name getCharts - Charts = Top tracks, albums, etc
     * @param {string} id - id of a user
     * @param {string} type - tracks, albums, artists or playlists
     */
    async getCharts(id, type) {

        if(typeof id != "string" || typeof type != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + `charts/${type}`)).data;
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

    async getTracks(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + `${id}/` + "tracks")).data;
        if(res.error) return res.error; 

        return {
            "tracks": res.data,
            "nb_results": res.data.length,
        }
    }
}

module.exports = User;