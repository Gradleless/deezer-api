const Base = require("./base");
const express = require("express");
const open = require("open")
const fs = require("fs")
const app = express();

class Oauth extends Base {

    constructor() {
        super();
        this.curi = "https://connect.deezer.com/oauth/auth.php?app_id=";
    }

    getAuthCode(app_id, perms, redirect_uri) {
        if(!redirect_uri) {

            redirect_uri = "http://localhost:80/";
            open(this.curi + app_id + "&redirect_uri=" + redirect_uri + "&perms=" + perms);

            app.get("/", function(req, res) {

                console.log(req.query.code);
                fs.writeFile("config.json", `{ "code": "${req.query.code}" }`, function(err) {

                    if(err) return console.log(err)
                });

                console.log("Code saved in config.json");
            })

            app.listen(80);
            
        } else {

        open(this.curi + app_id + "&redirect_uri=" + redirect_uri + "&perms=" + perms);
        }
    }

    async getAuth(app_id, app_secret, code) {

        if(!app_id || app_secret || code) return console.log("We need all of the parameters !");
        if(typeof app_id != "string" || typeof app_secret != "string" || typeof code != "string") return console.log("It must be a string value !");

        const res = (await this.axios.get(`https://connect.deezer.com/oauth/access_token.php?app_id=${app_id}&secret=${app_secret}&code=${code}`)).data;

        return {
            // "all_data": res,
            "token": res.access_token,
            "expire_time": res.expires
        }

    }

}

module.exports = Oauth;