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
     * @param {Array} perms - (array of string) perms u want to have, don't forget to add a comma between each perms 
     * @param {string} redirect_uri - (optional) if u have a different uri to use
     */
    async authenticate(app_id, perms, redirect_uri = "http://localhost:80/redirect", app_secret = null, code = null) {
        if (!app_id) {
            console.error("App ID is required.");
            return null;
        }

        if (app_secret && code) {
            // Retrieve access token using app_id, app_secret, and code
            try {
                const response = await this.axios.get(`https://connect.deezer.com/oauth/access_token.php?app_id=${app_id}&secret=${app_secret}&code=${code}`);
                const data = response.data;

                if (data.includes("wrong code")) {
                    console.error("Wrong code or outdated code");
                    return null;
                }

                const token = data.split("&expires=")[0].slice(13);
                const expire_time = data.split("&expires=")[1];

                return { token, expire_time };
            } catch (error) {
                console.error("Failed to retrieve access token", error);
                return null;
            }
        } else {
            // Generate authorization URL and start server to listen for redirect
            const permissions = perms.join(',');
            const authUrl = `${this.curi}${app_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&perms=${permissions}`;
            open(authUrl);

            app.get("/redirect", async (req, res) => {
                const { code } = req.query;
                if (code) {
                    try {
                        await fs.promises.writeFile("config.json", JSON.stringify({ code }));
                        console.log("Code saved in config.json");
                        res.send("Authentication successful. You can close this window.");
                    } catch (err) {
                        console.error("Failed to write code to config.json", err);
                        res.status(500).send("Failed to save authentication code.");
                    }
                } else {
                    res.status(400).send("No code provided in the redirect.");
                }
            });

            if (!this.server) {
                this.server = app.listen(80, () => console.log("Server listening on port 80"));
            }
        }
    }
}

module.exports = Oauth;