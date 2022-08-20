const Base = require("./base");

class Charts extends Base {

    constructor() {
        super();
        this.urid = this.uri + "chart/0/"
    }

    /**
     * @name getCharts - Charts = Top tracks, albums, etc
     * @param {string} type - tracks, albums, artists, playlists or podcasts
     */
    async getCharts(type) {

        if(typeof type != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + type)).data;

        switch(type) {

            case "tracks":
            case "albums":
            case "artists":
            case "playlists":
            case "podcasts":
                return {
                    "data": res.data,
                    "nb_results": res.total
                }            
            default:
                console.log("There's only 5 categories: tracks, albums, artists, playlists and podcasts");
                break;
        }
    }
}

module.exports = Charts;