/**
 * Created by abhijeetgupta on 14/07/15.
 */

var rp = require('request-promise');
var request = require('request');
module.exports = {
    getRidersInZone: function (config, zone,  callback) {
//        zone = 7;
//        riderActiveStatus = 1;
        console.log("zone---->>>",zone)
        var options = {
            uri : config.APIurl,
            method : 'POST',
            form: {
                method: "getallresources",
                email: config.email,
                key: config.key,
                zoneid: zone
            }
        };
//        status: req.session.config.riderActiveStatusInUse

//        rp(options)
//            .then(function (response) {
//                console.log("got resources", response);
//                    console.log("service res--->>>", response);
//                    return callback(null, response);
//
//            })
//            .catch(function(error){
//                console.log("error in getting resource")
//                return callback(error, {"status": "Failed"});
//            });
//




        request(options, function(error, response, body){
            if(error){
                sails.log.error("error in successfully getting the rider in specified zone");
                return callback(error, {"status": "Failed"});
            }else{
                sails.log.debug("successfully getting the rider in specified zone");
                return callback(null, body);
            }

        });
    }
}
