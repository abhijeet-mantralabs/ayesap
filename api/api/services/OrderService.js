/**
 * Created by abhijeetgupta
 */


var rp = require('request-promise');
var partner = sails.config.globals.partnerDetails;
var APIurl = sails.config.globals.APIurl;
var request = require('request');
module.exports = {
    createOrder: function (payload,  callback) {

        sails.log.debug("addTaskFinal service  Payload --- >>>")
        sails.log.debug(payload.payload)
        var route = 1 // should be 1 at live push , should be 0 while testing
        var options = {
            uri : APIurl,
            method : 'POST',
            form: {
                method: "addtask",
                email: partner.email,
                key: partner.key,
//                zoneid: payload.zoneid,
                route: route,
                payload: JSON.stringify(payload.payload)
            }
        };
        if(payload.zoneid){
            options.form.zoneid = payload.zoneid;
        }
//        sails.log.debug("book now service options -- >>>  ", options);

        request(options, function(error, response, body){
            if(error){
                sails.log.error("book order service error");
                return callback(error, {"status": "Failed"});
            }else{
                sails.log.debug("positive response from service");
                return callback(null, body);
            }

        });
//            .then(function (response) {
//                sails.log.debug("order booked", response);
//                sails.log.debug("book order service res--->>>", response);
//                return callback(null, response);
//
//            })
//            .catch(function(error){
//
//
////                sails.log.error("error in getting resource", error);
//                return callback(error, {"status": "Failed"});
//            });
    }
}