const Base = require("./base");

class Radio extends Base {

    constructor() {
        super();
        this.urid = this.uri + "radio/";
        this.suri = this.uri + "search/radio?q=";
    }

    async getRadio(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.uri + id)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "title": res.title,
            "description": res.description,
            "share": res.share,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "tracklist": res.tracklist,
            "md5_image": res.md5_image
        }
    }

    async searchRadio(radio) {

        if(typeof radio != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + radio)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "data": res.data,
            "nb_results": res.total
        }
    }

    async getRadiosByGenre() {

        const res = (await this.axios.get(this.urid + "genres")).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "data": res.data,
            "nb_results": res.data.length
        }
    }

    async getTopRadios() {

        const res = (await this.axios.get(urid + "top")).data;
        if(res.error) return res.error;

        return {
            //"all_data": res,
            "data": res.data,
            "nb_results": res.total,
            "next_page": res.next
        }
    }

    async getTracksOfRadio(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id + `/tracks`)).data;
        if(res.error) return res.error;

        return {
            //"all_data": res,
            "data": res.data,
            "nb_results": res.data.length
        }
    }

    async addFavorite(token, radio_id) {

        if(typeof token != "string" || typeof radio_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.uri + "/user/me/radios", { data: {}}, { params: { access_token: token, radio_id: radio_id }})).data;
        if(res.error) return res.error;

        return res;
    }
}

module.exports = Radio;