const Base = require("./base");

class Editorial extends Base {

    constructor() {
        super();
        this.urid = this.uri + "editorial/"
    }

    /**
     * @name getEditorial
     * @param {string} id 
     */
    async getEditorial(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`); 

        return {
            "id": res.id,
            "name": res.name,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "type": res.type
        }
    }

    /**
     * @name getChartsByEditorial
     * @param {string} id 
     * @param {string} type - tracks, albums, artists, playlists, podcasts and all
     */
    async getChartsByEditorial(id, type) {

        if(typeof id != "string" || typeof type != "string") return console.log("It must be string values !");
        const res = (await this.axios.get(this.urid + id + "/charts")).data;

        switch(type) {

            case "tracks":
                return {
                    "data": res.tracks.data,
                    "nb_results": res.tracks.total
                }               
            case "albums":
                return {
                    "data": res.albums.data,
                    "nb_results": res.albums.total
                }
            case "artists":
                return {
                    "data": res.artists.data,
                    "nb_results": res.artists.total
                }
            case "playlists":
                return {
                    "data": res.playlists.data,
                    "nb_results": res.playlists.total
                }
            case "podcasts":
                return {
                    "data": res.podcasts.data,
                    "nb_results": res.podcasts.total
                }
            case "all":
                return {
                    "data": res
                }
            default:
                console.log("There's only 6 categories: tracks, albums, artists, playlists, podcasts and all")
                break;
        }
    }

    /**
     * @name getSelectionByEditorial
     * @param {string} id - must be "0"
     */
    async getSelectionByEditorial(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id + "/selection")).data;
        
        return {
            "data": res.data,
            "nb_results": res.data.length
        }
    }

    /**
     * @name getReleasesByEditorial // It's like the same as Genre object so idk why they made a different object for this
     * @param {string} id 
     */
    async getReleasesByEditorial(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id + "/selection")).data;
        
        return {
            "data": res.data,
            "nb_results": res.total
        }
    }
}

module.exports = Editorial;