class Base {

    constructor() {
        this.axios = require("axios").default;
        this.uri = "https://api.deezer.com/";
        this.order_value = {
            "RANKING": "RANKING",
            "TRACK_ASC": "TRACK_ASC",
            "TRACK_DESC": "TRACK_DESC",
            "ARTIST_ASC": "ARTIST_ASC",
            "ARTIST_DESC": "ARTIST_DESC",
            "ALBUM_ASC": "ALBUM_ASC",
            "ALBUM_DESC": "ALBUM_DESC",
            "RATING_DESC": "RATING_DESC",
            "DURATION_ASC": "DURATION_ASC",
            "DURATION_DESC": "DURATION_DESC"
        }
    }

    /**
     * @name convertDuration
     * @param {int} duration 
     * @returns duration in minutes
     */
    convertDuration(duration) {

        const dur = duration / 60; 
        if(!dur.isInteger) { 

            const float = (dur - Math.floor(dur)) * 60;
            return `${Math.floor(dur)}:${float}`;
        } else {

            return `${dur}:00`;
        }
    }

    async getRequest(link) {

        if(typeof link != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(link)).data;

        return res;
    }

    async search(order, adv_search) {

        if(typeof order != "string" || typeof adv_search != "string") return console.log("It must be a string value !");
        if(order) {
            const res = (await this.axios.get(this.uri + `search/?q=${adv_search}`, { params: { order: order }})).data;
            if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

            return {
                "data": res.data,
                "nb_results": res.total
            }
        } else {
            const res = (await this.axios.get(this.uri + `search/?q=${adv_search}`)).data;
            if(res.error) return console.log(res.error.message + ` code: ${res.error.code}`);

            return {
                "data": res.data,
                "nb_results": res.total
            }
        }
    }
}

module.exports = Base;