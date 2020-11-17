const request = require("request");
const fs = require("fs");
var results = 0;
var liveStreamers = {"users": []};

let paginateRequest = (pagination) => {

    request({
        url: `https://api.twitch.tv/helix/streams?first=100${pagination == "" ? "" : "&after="+pagination}`,
        json: true,
        headers: {
            "Client-ID": "r4oxap94zouxcl5bkja33qq5rpm0yj",
            "Authorization": "Bearer im6zalm3d62re6yreo2ihs68ajcsax"
        }

    }, (error, response, body) => {
        for (var i = 0; i < body.data.length; i++) {
            results += 1
        }

        liveStreamers.users = liveStreamers.users.concat(body.data.map((item) => item.user_name));
        console.log("results so far: " + results)

        if (body.pagination.cursor) {
            paginateRequest(body.pagination.cursor)
            console.log('function was called for pagination')
            console.log('-----------------------------------')

        } else {
            console.log('Paginate request returned ' + results + ' streamers')
            fs.writeFileSync("live.json", JSON.stringify(liveStreamers))
        }


    })
};
paginateRequest("")