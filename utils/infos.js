const Base = require("./base");

class Infos extends Base {

    constructor() {
        super();
        this.urid = this.uri + "infos/";
    }

    async getInfos() {

        const res = (await this.axios.get(this.urid)).data

        return {
            "country_iso": res.country_iso,
            "country": res.country,
            "open": res.open,
            "pop": res.pop, 
            "upload_token": res.upload_token,
            "token_lifetime": this.convertDuration(res.upload_token_lifetime),
            "user_token": res.user_token,
            "hosts": {
                "stream": res.hosts.stream,
                "images": res.hosts.images
            },
            "ads": {
                "audio": {
                    "start": res.ads.audio.default.start,
                    "interval": res.ads.audio.default.interval,
                    "unit": res.ads.audio.default.unit
                },
                "display": {
                    "start": res.ads.display.interstitial.start,
                    "interval": res.ads.display.interstitial.interval,
                    "unit": res.ads.display.interstitial.unit
                },
                "iphone": {
                    "enabled": res.ads.big_native_ads_home.iphone.enabled
                },
                "ipad": {
                    "enabled": res.ads.big_native_ads_home.ipad.enabled
                },
                "android": {
                    "enabled": res.ads.big_native_ads_home.android.enabled
                },
                "android_tablet": {
                    "enabled": res.ads.big_native_ads_home.android_tablet.enabled
                }
            },
            "has_podcasts": res.has_podcasts,
            "offers": res.offers
        }
    }
}


module.exports = Infos;