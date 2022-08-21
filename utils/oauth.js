const Base = require("./base");
const express = require("express");
const open = require("open")
const fs = require("fs")
const app = express();

class Oauth extends Base {

    constructor() {
        super();
        this.curi = "https://connect.deezer.com/oauth/auth.php?app_id=";
        this.permissions = {
            "basic_access": "basic_access",
            "email": "email",
            "offline_access": "offline_access",
            "manage": {
                "library": "manage_library",
                "community": "manage_community",
            },
            "delete_library": "delete_library",
            "history": "listening_history"
        }
    }

    /**
     * 
     * @param {string} app_id - ID of your app, that seems logical
     * @param {string} perms - perms u want to have, don't forget to add a comma between each perms 
     * @param {string} redirect_uri - (optional) if u have a different uri to use
     */
    async getAuthCode(app_id, perms, redirect_uri) {
        if(!redirect_uri) {

            redirect_uri = "localhost:80";
            open(this.curi + app_id + "&redirect_uri=http://" + redirect_uri + "/redirect/" + "&perms=" + perms);

            app.get("/redirect", function(req, res) {

                console.log(req.query.code);
                fs.writeFile("config.json", `{ "code": "${req.query.code}" }`, function(err) {

                    if(err) return console.log(err)
                });

                console.log("Code saved in config.json");
            })

            var server = app.listen(80);             
        } else {

        open(this.curi + app_id + "&redirect_uri=" + redirect_uri + "&perms=" + perms);
        }
    }

    async getAuth(app_id, app_secret, code) {

        if(!app_id || !app_secret || !code) return console.log("We need all of the parameters !");
        if(typeof app_id != "string" || typeof app_secret != "string" || typeof code != "string") return console.log("It must be a string value !");

        const res = (await this.axios.get(`https://connect.deezer.com/oauth/access_token.php?app_id=${app_id}&secret=${app_secret}&code=${code}`)).data;
        if(res == "wrong code") return console.log("Wrong code or outdated code");

        return {
            // "all_data": res,
            "token": res.split("&expires=")[0].slice(13),
            "expire_time": res.split("&expires=")[1],
        }
    }
}

module.exports = Oauth;