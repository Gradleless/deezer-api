class Base {

    constructor() {
        this.axios = require("axios").default;
        this.uri = "https://api.deezer.com/";
    }
}

module.exports = Base;