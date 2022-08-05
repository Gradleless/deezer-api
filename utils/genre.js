const Base = require("./base");

class Genre extends Base {

    constructor() {
        super();
        this.urid = this.uri + "genre/";
        this.suri = this.uri + "search/genre?q="
    }

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
}

module.exports = Genre;