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
//        if(!req.body || !req.body.zoneId){
//            res.status(400).json( {status: 400 , message: "zone Id is missing" });
//        }else{
//            var zone = req.body.zoneId;
//            console.log(zone)
//
//            if(sails.config.globals.riderActiveStatusInUse == 1){
//                var  checkForOnlyRiderCheckedIn = true;
//            }else if(sails.config.globals.riderActiveStatusInUse == 0){
//                var  checkForOnlyRiderCheckedIn  = false;
//            }
//            ActiveResourceService.getRidersInZone(zone, function(err, response) {
//                if (err) {
//                    console.log("error in controller", err)
//                    res.status(err.status).json(error);
//
//                } else {
//                    console.log("response in controller----->>");
//                    console.log(response);
//                    response = JSON.parse(response)
//                    _.forEach(response.output.data.resources, function(resource){
//                        console.log("resource------>>>")
////                    console.log(resource)
//
//                        resource.resId = resource[" id "];
//                        resource.resName = resource[" name "];
//                        resource.maxCapacity = resource[" maxcapcity "];
//                        resource.usedCapacity = resource[" usedcapacity "];
//                        resource.resourceType = resource[" resource type"];
//                        resource.resMobile = resource[" mobile"];
//                        resource.resLat = resource[" lat"];
//                        resource.resLong = resource[" lng"];
//
//                        console.log("used capacity", resource[" usedcapacity "]);
//                        delete resource[" id "];
//                        delete resource[" name "];
//                        delete resource[" maxcapcity "];
//                        delete resource[" usedcapacity "];
//                        delete resource[" resource type"];
//                        delete resource[" mobile"];
//                        delete resource[" lat"];
//                        delete resource[" lng"];
//                        resource.checkForOnlyRiderCheckedIn = checkForOnlyRiderCheckedIn;
//                    })
//                    response.output.data.resources
////                    res.json({ details:{ resourceList: response.output.data.resources}} );
//                }
//            })
//        }
    },
//    getAllResourceStatus: function(req, res) {
//        //sample input-->> {zoneId: 9}
//
//        if(!req.body || !req.body.zoneId){
//            res.status(400).json( {status: 400 , message: "zone Id is missing" });
//        }else{
//            var zone = req.body.zoneId;
//            console.log(zone)
//
////            if(sails.config.globals.riderActiveStatusInUse == 1){
////                var  checkForOnlyRiderCheckedIn = true;
////            }else if(sails.config.globals.riderActiveStatusInUse == 0){
////                var  checkForOnlyRiderCheckedIn  = false;
////            }
//            ActiveResourceService.getRidersInZone(zone, function(err, response) {
//                if (err) {
//                    console.log("error in controller", err)
//                    res.status(err.status).json(error);
//
//                } else {
//                    console.log("response in controller----->>");
//                    console.log(response);
//                    response = JSON.parse(response)
//                    var checkedInRes = [];
//                    _.forEach(response.output.data.resources, function(resource){
//                        console.log("resource------>>>")
//                        resource.resId = resource["id"];
//                        resource.resName = resource["name"];
//                        resource.maxCapacity = resource["maxcapacity"];
//                        resource.usedCapacity = resource["usedcapacity"];
//                        resource.resourceType = resource["resource type"];
//                        resource.resourceValue = resource["resource value"];
//                        resource.resMobile = resource["mobile"];
//                        resource.resLat = resource["lat"];
//                        resource.resLong = resource["lng"];
//
//                        delete resource["id"];
//                        delete resource["name"];
//                        delete resource["maxcapacity"];
//                        delete resource["usedcapacity"];
//                        delete resource["resource type"];
//                        delete resource["resource value"];
//                        delete resource["mobile"];
//                        delete resource["lat"];
//                        delete resource["lng"];
//                        resource.checkForOnlyRiderCheckedIn = true;
//                        if(resource.checkin == 1){
//                            checkedInRes.push(resource);
//                        }
//
//                    })
//                    res.json({ details:{ resourceList: checkedInRes}} );
//                }
//            })
//        }
//
//    },
    getAllResourceStatus: function(req, res) {
        //sample input-->> {zoneId: 9}

        if(!req.body || !req.body.zoneId || !req.body.latitude || !req.body.longitude || !req.body.retailerType){
            res.status(400).json( {status: 400 , message: "zone Id/latlong/type is missing" });
        }else{
            var zone = req.body.zoneId;
            console.log(zone)
            var retailerLocation = {
                latitude: parseFloat(req.body.latitude),
                longitude: parseFloat(req.body.longitude)
            }

            ActiveResourceService.getRidersInZone(zone, function(err, response) {
                if (err) {
                    console.log("error in controller", err)
                    res.status(err.status).json(error);

                } else {
                    console.log("response in controller----->>");
                    console.log(response);
                    response = JSON.parse(response)
                    var checkedInRes = [];
                    _.forEach(response.output.data.resources, function(resource){
                        console.log("resource------>>>")
                        if(resource.checkin == 1){
                            var formattedRes = {
                                resId : resource["id"],
                                resName: resource["name"],
                                maxCapacity  : resource["maxcapacity"],
                                usedCapacity : resource["usedcapacity"],
                                resourceType : resource["resource type"],
                                resourceValue: resource["resource value"],
                                resMobile : resource["mobile"],
                                location : {
                                    latitude:  parseFloat(resource["lat"]),
                                    longitude: parseFloat(resource["lng"])
                                },
                                zoneId: req.body.zoneId,
                                time:  resource["time"],
                                speed:   resource["speed"],
                                checkin: resource["checkin"],
                                checkForOnlyRiderCheckedIn : true
                            }
                            checkedInRes.push(formattedRes);
                        }

                    })
                    async.map(checkedInRes, function(res, cb){
                        ActiveResource.saveUpRes(res, function(err, response){
                            if(err){

                            }else{
                                cb(null, res);
                            }
                        })
                    }, function(err, checkedInRes){

                        var zoneData = {
                            zoneId: req.body.zoneId,
                            lastUpdated:  new Date()
                        }
                        Zone.saveZone(zoneData, function(err, zoneRes){
                            if(err){
                                sails.log.debug(err)
                            }else{
                                sails.log.debug("in completed  function--->>");
                                sails.log.debug(JSON.stringify(zoneRes))
                                ActiveResource.listResourceByZone({zoneId: zoneRes.zoneId}, function(err, resByZone){
                                    if(err){
                                        sails.log.error("err in fetching riders by zone id from DB->>>")
                                        res.status(err.status).json(err);
                                    }else{
                                        sails.log.debug("retailerLocation-->>",  retailerLocation)
                                        ActiveResource.findRidersNearBy(retailerLocation, 2000, function(err, resWithInCircle){
                                            if(err){
                                                sails.log.debug("err in controller for finding with in 2 km riders")
                                                sails.log.debug(err)
                                            }else{
                                                sails.log.debug("resWithIn distance Circle--->>")
                                                var finalList ={
                                                    nearestRider :{},
                                                    resourceList: resWithInCircle
                                                }
                                                res.json({message: "rider fetched from db by zoneid", details: finalList} );
                                            }
                                        })

//                                        res.json({message: "rider fetched from db by zoneid", details: resByZone} );
                                    }
                                })
                            }
                        })
                    });

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

