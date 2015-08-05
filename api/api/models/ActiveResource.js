///**
// * Created by abhijeetgupta on 17/07/15.
// */
////{
//    " id ": "CAP7a",
//    " name ": "cp1a",
//    " maxcapacity ": 15,
//    " usedcapacity": 5,
//    " resource type": "General",
//    " mobile": "918197322665",
//    " lat": "12.976328",
//    " lng": "77.634270",

////},
//
module.exports = {
    types: {
        point: function(latlng){
            return latlng.latitude && latlng.longitude
        }
    },

    attributes: {
        resId: {
            type: 'string'
        },
        name:{
            type: 'string'
        },
        maxcapacity:{
            type: 'integer'
        },
        usedcapacity:{
            type: 'integer'
        },
        resourcetype:{
            type: 'string'
        },
        mobile:{
            type: 'string'
        },

        zoneId: {
            type: 'string'
        },

        location: {
            type: 'object',
            point: true
        }
    },
    saveUpRes:function(opts, cb){
        sails.log.debug("rider rcvd in db call ----  >> ", opts);

        ActiveResource.findOne({resId:opts.resId}).exec(function(err, activeRes){
            if(err){
                cb(err);
            }else if(!activeRes){
                console.log("res created----->>")
                ActiveResource.create(opts, function(err, savedActiveRes){
                    if(err){
                        console.log("err in saved active resources in db----- >>  ")
                        console.log(err)
                        cb(err);
                    }else{
                        console.log("saved active resources in db----- >>  ")
                        console.log(savedActiveRes)
                        cb(null,savedActiveRes);
                    }
                });
            }else if(activeRes){
                console.log("res updated----->>")
                ActiveResource.update({resId:opts.resId}, opts ,  function (err, updatedActiveRes) {
                    if (!err){
                        cb(null, updatedActiveRes[0]);
                    }else{
                        cb(err);
                    }
                });
            }
        });
    },
    listResources: function (opts, cb) {
        ActiveResource.find().exec(function(err, resources){
            if(err){
                cb(err);
            }else if(resources){
                cb(null, resources);
            }
        });
    },
    listResourceByZone: function(opts, cb) {
        console.log(opts);
        ActiveResource.find({zoneId: opts.zoneId}).exec(function(err, resources){
            if(err){
                cb(err);
            }else if(resources){
                cb(null, resources);
            }
        });
    },
    findRidersNearBy: function(zone,point, distance, cb){
        var condition = {
            zoneId: zone,
            location: {
                "$near":{
                    "$maxDistance": distance,
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [point.latitude, point.longitude]
                    }
                }
            }

        };
        ActiveResource.find(condition).exec(function(err, matchedRes){
            if(err){
                sails.log.debug("err in matching resources within 2 km -->>")
                sails.log.debug(err);
                cb(err);
            }else if(matchedRes){
                sails.log.debug("From db matching resources within 2 km fetched -->>", matchedRes)
                sails.log.debug(matchedRes);
                cb(null, matchedRes);
            }else if(!matchedRes){
                sails.log.debug("no matched resources");
                cb(null, matchedRes);
            }
        })
    },
    removeResourceByIdandZone: function(opts, cb){
//        {retailerId:{$in:["0005", "0006","0007"]}}
        ActiveResource.destroy(opts).exec(function(err, resource){
            if(err){
                sails.log.debug("error in deleting resource against resource Id--->>")
                cb(err);
            }else if(resource){
                sails.log.debug("resource against resource Id--->>")
                cb(null, resource);
            }
        })
    }
};