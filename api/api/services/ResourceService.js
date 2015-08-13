/**
 * Created by abhijeetgupta on 14/07/15.
 */

var rp = require('request-promise');
var partner = sails.config.globals.partnerDetails;
var APIurl = sails.config.globals.APIurl;


module.exports = {
    getRidersInZone: function (zone,  callback) {
//        zone = 7;
//        riderActiveStatus = 1;
        var options = {
            uri : req.session.config.APIurl,
            method : 'POST',
            form: {
                method: "getallresources",
                email: req.session.config.email,
                key: req.session.config.key,
                zoneid: zone,
                status: req.session.config.riderActiveStatusInUse
            }
        };
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
