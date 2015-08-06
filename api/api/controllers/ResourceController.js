/**
 * ResourceController
 *
 * @description :: Server-side logic for managing resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');
var request = require('request');
var geolib = require('geolib');
var moment = require('moment');
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


            var fetchZoneResource = function(zone, retailerLocation){
                ActiveResource.findRidersNearBy(zone, retailerLocation, sails.config.globals.distanceCheckCircleInMeter, function(err, DBResWithInCircle){
                    if(err){
                        sails.log.debug("err in controller for finding with in 2 km riders")
                        sails.log.debug(err)
                    }else{
                        sails.log.debug("resWithIn distance Circle--->>")
                        var resWithInCircle = [];
                        if(DBResWithInCircle.length>0){

                            _.forEach(DBResWithInCircle, function(nearResource){

                                var resAcceptable = "no";
                                if(req.body.retailerType != "Food" && req.body.retailerType != "Grocery"){
                                   resAcceptable = "yes"
                                }else if(req.body.retailerType == "Food" && nearResource.usedCapacity == 0){
                                   resAcceptable = "yes"
                                }else if(req.body.retailerType == "Grocery" && nearResource.usedCapacity <= 1){
                                   resAcceptable = "yes"
                                }


                                if(resAcceptable == "yes"){
                                    nearResource.distance =  geolib.getDistance(retailerLocation, nearResource.location);
                                    nearResource.eta =  (((geolib.getDistance(retailerLocation, nearResource.location))*1.5)/(nearResource.speed*(5/18)))/60;
                                    resWithInCircle.push(nearResource);
                                }

                            })

                            if(resWithInCircle.length>0){
                                resWithInCircle.sort(function(a, b) {
                                    return a.eta > b.eta;
                                });
                                var finalList = {
                                    nearestRider :resWithInCircle[0],
                                    resourceList: resWithInCircle,
                                    eta:  Math.ceil(resWithInCircle[0].eta),
                                    resourceType: resWithInCircle[0].resourceType
                                }
                            }else{
                                sails.log.debug("no riders nearby after full filters ------>>")
                                var finalList = {
                                    resourceList: resWithInCircle
                                }
                            }
                        }else{
                            sails.log.debug("no riders nearby ------>>")
                            var finalList = {
                                resourceList: resWithInCircle
                            }
                        }
                        sails.log.debug("final list----------->>", finalList);
                        res.json({message: "rider fetched from db by zoneid", details: finalList });
                    }
                })

            }
            var updateZone = function(zoneData, retailerLocation){
                Zone.saveZone(zoneData, function(err, zoneRes){
                    if(err){
                        sails.log.debug(err)
                    }else{
                        sails.log.debug("zone last updated---->>", zoneRes);
                        sails.log.debug("in completed  function--->>");
                        sails.log.debug(JSON.stringify(zoneRes))
                        fetchZoneResource(zoneRes.zoneId, retailerLocation);
//
                    }
                })
            }

            var callZoneService = function(zone, retailerLocation){
                ActiveResourceService.getRidersInZone(zone, function(err, response) {
                    if (err) {
                        console.log("error in controller", err)
                        res.status(err.status).json(error);

                    }else {
//                     && response.output.data && response.output.data.resources != ""

                        console.log("response in controller----->>");
                        console.log(response);
                        response = JSON.parse(response)
                        if(response && response.output && (response.output.status == 200) && response.output.data && (response.output.data.resources != "")){

                            var checkedResIdArr = [];
                            var checkedInRes = [];
                            _.forEach(response.output.data.resources, function(resource){
                                console.log("resource------>>>")
//                                var now = new Date();
//                                var timeDiffInms = now  - fetchedZone.updatedAt.getTime();
//                                sails.log.debug("zone updated time diff. in ms--->>",timeDiffInms);
//                                if(timeDiffInms < sails.config.globals.lastTimeCheckms ){
//                                    sails.log.debug("zones last updated time less thn 1 min.. feteching directly from db-->>");
//                                    fetchZoneResource(req.body.zoneId, retailerLocation);
//                                }else{
//                                    sails.log.debug("zones last updated time is morethn 1 min-->>");
//                                    callZoneService(req.body.zoneId, retailerLocation);
//                                }
//
                                if( (resource.checkin == 1) && (resource.usedcapacity < resource.maxcapacity)){

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
                                    checkedResIdArr.push(formattedRes.resId);
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
                                   resourceIds: checkedResIdArr
                                }


                               sails.log.debug("checkedResIds arr--->>>",checkedResIdArr);
                                DBResByZoneIdArr = []
                                var notInZoneNow = [];
                                ActiveResource.listResourceByZone({zoneId:req.body.zoneId }, function(err, ResByZone){
                                   if(ResByZone.length > 0){
                                       _.forEach(ResByZone, function(eachDBRes){
                                           DBResByZoneIdArr.push(eachDBRes.resId)
                                       })
                                       sails.log.debug("DB checkedResIds arr--->>>",DBResByZoneIdArr);
                                       notInZoneNow = difference(DBResByZoneIdArr, checkedResIdArr)
                                       sails.log.debug("not in zone now--->>>",notInZoneNow);



                                        if(notInZoneNow.length > 0){
                                            async.map(notInZoneNow, function(noZoneResId, cb){
                                                var deleteFilter = {
                                                    resId : noZoneResId,
                                                    zoneId : req.body.zoneId
                                                }
                                                ActiveResource.removeResourceByIdandZone(deleteFilter, function(err, response){
                                                    if(err){
                                                        sails.log.debug("err in delete diff. resources in db relative to new data")
                                                    }else{
                                                        sails.log.debug("deleted diff. resources in db relative to new data, new are--->>")
                                                        cb(null, response);
                                                    }
                                                })
                                            }, function(err, notInZoneNow){
                                               sails.log.debug("final call back in calling zone")
                                                updateZone(zoneData, retailerLocation);
                                            })
                                        }else{
                                            updateZone(zoneData, retailerLocation);
                                        }

                                   }
                                })


                            });
                        }else if(response && response.output && (response.output.status == 403) && response.output.data){
                           console.log("message on 7-->>")
                            res.json({message: response.output.data.message, details: {resourceList: [] } });
                        }else{
                            res.json({message: "no rider fetched empty from FV backend", details: {resourceList: [] } });
                        }
                    }
                })
            }
            Zone.getZoneDetails({zoneId: zone}, function(err, fetchedZone){
                if(err){
                    sails.log.debug(err);
                }else{
                    if(fetchedZone == "no zone found"){
                        sails.log.debug(fetchedZone)
                        callZoneService(req.body.zoneId, retailerLocation);
                    }else{
                        console.log("zones found-->>")

                        var now = new Date();
                        var timeDiffInms = now  - fetchedZone.updatedAt.getTime();
                        sails.log.debug("zone updated time diff. in ms--->>",timeDiffInms);
                        if(timeDiffInms < sails.config.globals.lastTimeCheckms ){
                            sails.log.debug("zones last updated time less thn 1 min.. feteching directly from db-->>");
                            fetchZoneResource(req.body.zoneId, retailerLocation);
                        }else{
                            sails.log.debug("zones last updated time is morethn 1 min-->>");
                            callZoneService(req.body.zoneId, retailerLocation);
                        }
                    }

                }
            })
        }

    },
    deleteResById: function(req, res){

    },
    getZonesData: function(req, res){
        Zone.listofUpdatedZones( function (err, zones) {
            if (err) {
                res.status(err.status).json({error: err});
            } else {

                _.forEach(zones, function(zone){
                      zone.now = moment().format();
//                    zone.lastUpdated = "Sat Jul 31 2015 10:31:24 GMT+0530 (IST)"
                        zone.TimeDiff = get_time_diff(zone.lastUpdated);

                })
                sails.log.debug(zones);
                res.json({ details:{ zoneList: zones}} );
            }
        });
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
//
//function get_time_diff(datetime)
//{
////    var datetime = typeof datetime !== 'undefined' ? datetime : "2014-01-01 01:02:03.123456";
//
//    var datetime = new Date(datetime).getTime();
//    var now = new Date().getTime();
//
//    if( isNaN(datetime) )
//    {
//        return "";
//    }
//
//    console.log( datetime + " " + now);
//
//    if (datetime < now) {
//
//        var milisec_diff = now - datetime;
//
//    }else{
//        var milisec_diff = datetime - now;
//    }
//
//    //    }else{
////        return "invalid last updated time";
////    }
//
//    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
//
//    var date_diff = new Date( milisec_diff );
//
////    return days + "d "+ (date_diff.getHours() - 5) + "h " + (date_diff.getMinutes() - 30) + "m";
//    return {
//        days: days,
//        hours:(date_diff.getHours() - 5),
//        minutes: (date_diff.getMinutes() - 30),
//        seconds: Math.floor(milisec_diff / 1000),
//        totalMinutes: Math.floor(milisec_diff / 1000 / 60)
//    }
//}
//
//
var difference = function(array){
    var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

    var containsEquals = function(obj, target) {
        if (obj == null) return false;
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    return _.filter(array, function(value){ return ! containsEquals(rest, value); });
};

//
//var fetchZoneResource = function(zone, retailerLocation){
//    ActiveResource.listResourceByZone({zoneId: zone}, function(err, resByZone){
//        if(err){
//            sails.log.error("err in fetching riders by zone id from DB->>>")
//            res.status(err.status).json(err);
//        }else{
//            sails.log.debug("retailerLocation-->>",  retailerLocation)
//            ActiveResource.findRidersNearBy(retailerLocation, 2000, function(err, resWithInCircle){
//                if(err){
//                    sails.log.debug("err in controller for finding with in 2 km riders")
//                    sails.log.debug(err)
//                }else{
//                    sails.log.debug("resWithIn distance Circle--->>")
//                    if(resWithInCircle.length>0){
//                        _.forEach(resWithInCircle, function(nearResource){
//                            nearResource.distance =  geolib.getDistance(retailerLocation, nearResource.location);
//                            nearResource.eta =  (((geolib.getDistance(retailerLocation, nearResource.location))*1.5)/(nearResource.speed*(5/18)))/60;
//                        })
////                                                Math.ceil((((geolib.getDistance(retailerLocation, nearResource.location))*1.5)/(nearResource.speed*(5/8)))/60);
//                        resWithInCircle.sort(function(a, b) {
//                            return a.eta > b.eta;
//                        });
//                        var finalList = {
//                            nearestRider :resWithInCircle[0],
//                            resourceList: resWithInCircle,
//                            eta:  Math.ceil(resWithInCircle[0].eta),
//                            resourceType: resWithInCircle[0].resourceType
//                        }
//                    }else{
//                        sails.log.debug("no riders nearby ------>>")
//                        var finalList = {
//                            resourceList: resWithInCircle
//                        }
//                    }
//
//
//                    res.json({message: "rider fetched from db by zoneid", details: finalList });
//                }
//            })
//
//        }
//    })
//}





//var fetchZoneResource = function(zone, retailerLocation){
//
//    sails.log.debug("retailerLocation-->>",  retailerLocation)
//    ActiveResource.findRidersNearBy(zone,retailerLocation, 2000, function(err, resWithInCircle){
//        if(err){
//            sails.log.debug("err in controller for finding with in 2 km riders")
//            sails.log.debug(err)
//        }else{
//            sails.log.debug("resWithIn distance Circle--->>")
//            if(resWithInCircle.length>0){
//                _.forEach(resWithInCircle, function(nearResource){
//                    nearResource.distance =  geolib.getDistance(retailerLocation, nearResource.location);
//                    nearResource.eta =  (((geolib.getDistance(retailerLocation, nearResource.location))*1.5)/(nearResource.speed*(5/18)))/60;
//                })
////                                                Math.ceil((((geolib.getDistance(retailerLocation, nearResource.location))*1.5)/(nearResource.speed*(5/8)))/60);
//                resWithInCircle.sort(function(a, b) {
//                    return a.eta > b.eta;
//                });
//                var finalList = {
//                    nearestRider :resWithInCircle[0],
//                    resourceList: resWithInCircle,
//                    eta:  Math.ceil(resWithInCircle[0].eta),
//                    resourceType: resWithInCircle[0].resourceType
//                }
//            }else{
//                sails.log.debug("no riders nearby ------>>")
//                var finalList = {
//                    resourceList: resWithInCircle
//                }
//            }
//
//
//            res.json({message: "rider fetched from db by zoneid", details: finalList });
//        }
//    })
//
//
//}