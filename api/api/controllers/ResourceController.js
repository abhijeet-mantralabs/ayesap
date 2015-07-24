/**
 * ResourceController
 *
 * @description :: Server-side logic for managing resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');
var request = require('request');
module.exports = {
    fetchNearResources : function(req, res){
       console.log(req.body)
    },
    reqForResRegister: function(req, res){
        if(!req.body || !req.body.mobile ||  !req.body.name){
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }else{
            console.log(req.body);
            Resource.requestResSignUp(req.body, function(err, user){
                if(err) {
                    res.status(err.status).json(err);
                }
                else{
                    console.log(user)
                    delete user.createdAt;
                    delete user.updatedAt;
                    res.json({message: "request registered", details:{ user: user}} );
                }
            });
//                }
//            });
        }
    },
    getResourceList: function (req, res) {
        Resource.listResources(req.body, function (err, resources) {
            if (err) {
                res.status(err.status).json({error: err});
            } else {
                res.json({ details:{ resourceList: resources}} );
            }
        });
    },
    getRiderByZone: function(req, res){
        var callback = function (rider) {
            ActiveResource.saveUp(rider, function (err, resource) {
                if (err) {
                    sails.log.debug("rider not saved to db")
                } else {
                    sails.log.debug("rider saved to db", resource)
                }
            })
        }

        ActiveResourceService.getRidersInZone(sails.config.globals.listOfZones[0], function(err, response) {
            if (err) {
                console.log("error in controller", err)
                res.status(err.status).json(error);
            } else {
                console.log("response in controller", response)
            }
        })
    },
    getAllResourceStatus: function(req, res) {
        //sample input-->> {zoneId: 9}

        if(!req.body || !req.body.zoneId){
            res.status(400).json( {status: 400 , message: "zone Id is missing" });
        }else{
            var zone = req.body.zoneId;
            console.log(zone)

            if(sails.config.globals.riderActiveStatusInUse == 1){
                var  checkForOnlyRiderCheckedIn = true;
            }else if(sails.config.globals.riderActiveStatusInUse == 0){
                var  checkForOnlyRiderCheckedIn  = false;
            }
            ActiveResourceService.getRidersInZone(zone, function(err, response) {
                if (err) {
                    console.log("error in controller", err)
                    res.status(err.status).json(error);

                } else {
                    console.log("response in controller----->>");
                    console.log(response);
                    response = JSON.parse(response)
                    _.forEach(response.output.data.resources, function(resource){
                        console.log("resource------>>>")
//                    console.log(resource)

                        resource.resId = resource[" id "];
                        resource.resName = resource[" name "];
                        resource.maxCapacity = resource[" maxcapcity "];
                        resource.usedCapacity = resource[" usedcapacity "];
                        resource.resourceType = resource[" resource type"];
                        resource.resMobile = resource[" mobile"];
                        resource.resLat = resource[" lat"];
                        resource.resLong = resource[" lng"];

                        console.log("used capacity", resource[" usedcapacity "]);
                        delete resource[" id "];
                        delete resource[" name "];
                        delete resource[" maxcapcity "];
                        delete resource[" usedcapacity "];
                        delete resource[" resource type"];
                        delete resource[" mobile"];
                        delete resource[" lat"];
                        delete resource[" lng"];
                        resource.checkForOnlyRiderCheckedIn = checkForOnlyRiderCheckedIn;
//                    ActiveResources.saveUp()
//                    ActiveResources.saveUp(resource, function)
                    })
                    res.json({ details:{ resourceList: response.output.data.resources}} );
                }
            })
        }

    }
};

//        zone = sails.config.globals.listOfZones[0];
//        async.each(sails.config.globals.listOfZones[], function(zone, callback) {
//
//            // Perform operation on file here.
//            ResourceService.getRidersInZone(7 ,zone,function(err, response) {
//                if (err) {
//                    console.log("error in controller", err)
//                    res.status(err.status).json(error);
//                } else {
//                    console.log("resource came in controller", response)
//
//
////                    res.json({message: "riders fetched", details: response});
//                }
//            })
//
//
////            if( file.length > 32 ) {
////                console.log('This file name is too long');
////                callback('File name too long');
////            } else {
////                // Do work to process file here
////                console.log('File processed');
////                callback();
////            }
//        }, function(err){
//            // if any of the file processing produced an error, err would equal that error
//            if( err ) {
//                // One of the iterations produced an error.
//                // All processing will now stop.
//                console.log('A file failed to process');
//            } else {
//                console.log('All files have been processed successfully');
//            }
//        });

