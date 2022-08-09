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
}

module.exports = Base;