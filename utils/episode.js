const Base = require("./base");

class Episode extends Base {

    constructor() {

        super();
        this.urid = this.uri + "episode/";
        this.suri = this.uri + "search/episode?q=";
    }

    async getEpisode(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.id == undefined) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.title,
            "description": res.description,
            "available": res.available,
            "release_date": res.release_date,
            "duration": this.convertDuration(res.duration),
            "link": res.link,
            "share": res.share,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "podcast": {
                "id": res.podcast.id,
                "name": res.podcast.title,
                "link": res.podcast.link,
                "picture": {
                    "small": res.podcast.picture_small,
                    "medium": res.podcast.picture_medium,
                    "big": res.podcast.picture_big,
                    "xl": res.podcast.picture_xl
                },
                "type": res.podcast.type
            },
            "type": res.type,
        }
    }
}

module.exports = Episode;