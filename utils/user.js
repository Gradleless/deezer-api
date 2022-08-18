const Base = require("./base");

class User extends Base {

    constructor() {
        super();
        this.urid = this.uri + "user/";
        this.suri = this.urid + "me/";
    }

    async getUser(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.id == undefined) return res.error;

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

    async getMyself(token) {

        if(typeof token != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri, { params: { access_token: token } })).data;
        if(res.id == undefined) return res.error;

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
}

module.exports = User;