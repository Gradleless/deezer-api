const Base = require("./base");

class Podcast extends Base {

    constructor() {
        super();
        this.urid = this.uri + "podcast/";
        this.suri = this.uri + "search/podcast?q=";
    }

    /**
     * @name getPodcast
     * @param {string} id 
     */
    async getPodcast(id) {

        if(typeof id != "string") return console.log("The parameter must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "title": res.title,
            "description": res.description,
            "isAvailable": res.available,
            "fans": res.fans,
            "link": res.link,
            "share": res.share,
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
     * @name searchPodcast
     * @param {string} name 
     */
    async searchPodcast(name) {

        if(typeof name != "string") return console.log("The parameter must be a string value !");
        const res = (await this.axios.get(this.suri + name)).data;

        if(res.data.length == 1) {

            const ress = res.data[0];
            return {
                // "all_data": res,
                "id": ress.id,
                "title": ress.title,
                "description": ress.description,
                "isAvailable": ress.available,
                "fans": ress.fans,
                "link": ress.link,
                "share": ress.share,
                "picture": {
                    "small": ress.picture_small,
                    "medium": ress.picture_medium,
                    "big": ress.picture_big,
                    "xl": ress.picture_xl
                },
                "type": ress.type
            }
        } else {

            return {
                "data": res.data,
                "nb_results": res.total
            }
        }
    }

    async addFavorite(token, podcast_id) {

        if(typeof token != "string" || typeof podcast_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.uri + "/user/me/podcasts", { data: {}}, { params: { access_token: token, podcast_id: podcast_id }})).data;
        if(res.error) return res.error;

        return res;
    }
}

module.exports = Podcast;