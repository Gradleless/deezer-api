const Base = require("./base");

class Genre extends Base {

    constructor() {
        super();
        this.urid = this.uri + "genre/";
        this.suri = this.uri + "search/genre?q="
    }

    /**
     * @name getGenre
     * @param {string} id 
     */
    async getGenre(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.id == undefined) return res.error;

        return {
            "id": res.id,
            "name": res.name,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl,
            },
            "type": res.type
        }
    }

    /**
     * @name getTypeByGenre
     * @param {string} id 
     * @param {string} type - artists, podcasts and radios only 
     */
    async getTypeByGenre(id, type) {

        if(typeof id != string || typeof type != "string") return console.log("The parameters must be string values");
        const res = (await this.axios.get(this.urid + id + `/${type}`)).data;

        switch(type) {

            case "artists":
            case "podcasts":
            case "radios":
                return {
                    "data":  res.data,
                    "nb_results": res.data.length
                }
            default:
                console.log("There's only 3 categories: artists, podcasts and radios");
                break;
        }
    }
}

module.exports = Genre;