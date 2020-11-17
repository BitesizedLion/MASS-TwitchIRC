const fs = require("fs");
const streamers = JSON.parse(fs.readFileSync("live.json"))

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        if(/^[ -~]+$/.test(key) && !/^\d+$/.test(key)) ret_arr.push(key.toLowerCase().trim());
    }
    return ret_arr;
}
var new_streamers = {"users": []};
new_streamers.users = remove_duplicates(streamers.users)
fs.writeFileSync("live_new.json", JSON.stringify(new_streamers))

console.log("orig: " + streamers.users.length)
console.log("uniq: " + remove_duplicates(streamers.users).length)