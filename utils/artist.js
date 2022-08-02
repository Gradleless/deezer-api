const Base = require("./base");

class Artist extends Base {

    constructor(id) {
        super();
        this.urid = this.uri + "artist/";
    }
    
    async getArtist(id) {
        
        if(typeof id != "string") return console.log("It must be a String value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.id == undefined) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.name,
            "link": res.link,
            "share": res.share,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "nb_albums": res.nb_album,
            "nb_fan": res.nb_fan,
            "radio": res.radio,
            "tracklist": res.tracklist
        }       
    }
}

module.exports = Artist;
