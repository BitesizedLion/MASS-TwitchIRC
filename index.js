var axios = require('axios');
const { ChatClient } = require("dank-twitch-irc");
const fs = require('fs');

const streamers = JSON.parse(fs.readFileSync('live_new.json'));

try {
    var client = new ChatClient({
        username: "name", password: "oauth:12345", rateLimits: "default", requestMembershipCapability: true, connectionRateLimits: {
            parallelConnections: 10000, // 1 by default
            // time to wait after each connection before a new connection can begin
            releaseTime: 10000, // in milliseconds, 2 seconds by default
        }, ignoreUnhandledPromiseRejections: true
    });
    var ready = false;
    client.on("ready", () => { console.log("Successfully connected to chat"); ready = true });
    client.on("close", (error) => {
        if (error != null) {
            console.error("Client closed due to error", error);
        }
    });
} catch (error) {

}



async function idiot(offset) {
    /*var config = {
        method: 'get',
        url: `https://api.twitch.tv/kraken/streams/?stream_type=live&limit=100&offset=${offset}`,
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'r4oxap94zouxcl5bkja33qq5rpm0yj'
        }
    };
    let { data } = await axios(config);
    streamers.users = streamers.users.concat(data.streams.map((item) => item.channel.name))
    fs.writeFileSync('streamers.json', JSON.stringify(streamers));
    */
    if (ready == false) { console.log("not ready") }
    console.log("exec")
    for (i in streamers.users) {
        try {
            await client.join(streamers.users[i]);
        }
        catch (error) {
            console.log(error)
        }


        console.log(client.joinedChannels.size)
    }
    console.log(client.joinedChannels.size)
}

(async () => {
    await client.connect();
    //
    client.join("mr_chicken_5");
    client.join("wildbilltv");

    //console.log("exec")
    await idiot();
    // var i = 0;
    // while (i <= 900) {
    //     await idiot(i);
    //     i += 1
    // }
})();
/*
while (true) {
    console.log(client.joinedChannels.size)
}*/