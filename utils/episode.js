const Base = require("./base");

class Episode extends Base {

    constructor() {
        super();
        this.urid = this.uri + "episode/";
        this.suri = this.uri + "search/episode?q=";
    }

    /**
     * @name getEpisode
     * @param {string} id 
     */
    async getEpisode(id) {

        if(typeof id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.urid + id)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "id": res.id,
            "name": res.title,
            "description": res.description,
            "available": res.available,
            "release_date": res.release_date,
            "duration": this.convertDuration(res.duration),
            "link": res.link,
            "share": res.share,
            "picture": {
                "small": res.picture_small,
                "medium": res.picture_medium,
                "big": res.picture_big,
                "xl": res.picture_xl
            },
            "podcast": {
                "id": res.podcast.id,
                "name": res.podcast.title,
                "link": res.podcast.link,
                "picture": {
                    "small": res.podcast.picture_small,
                    "medium": res.podcast.picture_medium,
                    "big": res.podcast.picture_big,
                    "xl": res.podcast.picture_xl
                },
                "type": res.podcast.type
            },
            "type": res.type,
        }
    }

    /**
     * @name searchEpisode
     * @param {string} name 
     */
    async searchEpisode(name) {

        if(typeof name != "string") return console.log("It must be a string value !");
        const res = (await this.axios.get(this.suri + name)).data;
        
        return {
            "data": res.data,
            "nb_results": res.total
        }
    }

    /**
     * @name getoEmbed
     * @param {string} id 
     * @param {boolean} autoplay - (optional) Play the music on load
     * @param {int} maxwidth - (optional) Maximum width of the resource
     * @param {int} maxheight - (optional) Maximum height of the resource
     * @param {boolean} radius - (optional) Radius visual effect
     * @param {boolean} tracklist - (optional) Display the tracklist 
    */
     async getoEmbed(id, data = { autoplay: false, maxwidth: 420, maxheight: 420, radius: true, tracklist: false }) {

        if(typeof id != "string") return console.log("It must be a string value !");

        const params = `/&autoplay=${data.autoplay}&maxwidth=${data.maxwidth}&maxheight=${data.maxheight}&radius=${data.radius}&tracklist=${data.tracklist}`
        const res = (await this.axios.get(this.uri + "oembed?url=https://www.deezer.com/episode/" + id + params)).data;
        if(res.error) return res.error;

        return {
            // "all_data": res,
            "version": res.version,
            "type": res.type,
            "cache_age": res.cache_age,
            "provider": {
                "name": res.provider_name,
                "url": res.provider_url
            },
            "entity": res.entity,
            "id": res.id,
            "url": res.url,
            "author_name": res.author_name,
            "title": res.title,
            "thumbnail": {
                "url": res.thumbnail_url,
                "width": res.thumbnail_width,
                "height": res.thumbnail_height
            },
            "required_width": res.width,
            "required_height": res.height,
            "oembed": res.html
        }
    }

    /**
     * @name setBookmark
     * @param {string} token 
     * @param {string} episode_id 
     * @param {int} offset - between 0 and 100
     * @returns 
     */
    async setBookmark(token, episode_id, offset) {

        if(typeof token != "string" || typeof episode_id != "string") return console.log("It must be a string value !");
        const res = (await this.axios.post(this.urid + `${episode_id}/bookmark`, { data: {}}, { params: { access_token: token, offset: offset }})).data;

        return res;
    }
}

module.exports = Episode;