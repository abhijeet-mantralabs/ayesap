/**
 * Created by abhijeetgupta on 18/07/15.
 */


var rp = require('request-promise');
var partner = sails.config.globals.partnerDetails;
var APIurl = sails.config.globals.APIurl;
module.exports = {
    createOrder: function (payload,  callback) {
//        payload.zoneid = 7;
        var route = 1
        var options = {
            uri : APIurl,
            method : 'POST',
            form: {
                method: "addtask",
                email: partner.email,
                key: partner.key,
                zoneid: payload.zoneid,
                route: route ,
                payload: payload.payload
            }
        };
        console.log("book now service options -- >>>  ", options)
        console.log(options)
        rp(options)
            .then(function (response) {
                console.log("order booked", response);
                console.log("book order service res--->>>", response);
                return callback(null, response);

            })
            .catch(function(error){
                console.log("error in getting resource")
                return callback(error, {"status": "Failed"});
            });
    }
}