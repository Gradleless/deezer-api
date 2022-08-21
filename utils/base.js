class Base {

    constructor() {
        this.axios = require("axios").default;
        this.uri = "https://api.deezer.com/";
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
}

module.exports = Base;