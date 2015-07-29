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
        lat:{
            type: 'string'
        },
        lng:{
            type: 'string'
        },
        zoneId: {
            type: 'string'
        }
    },
    saveUpRes:function(opts,cb){
        sails.log.debug("rider rcvd in db call ----  >> ", opts);

        ActiveResource.findOne({resId:opts.resId}).exec(function(err, activeRes){
            if(err){
                cb(err);
            }else if(!activeRes){
                ActiveResource.create(opts, function(err, savedActiveRes){
                    if(err){
                        cb(err);
                    }else{
                        cb(null,savedActiveRes);
                    }
                });
            }else if(activeRes){
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
        ActiveResource.find({zoneId: opts.zoneId})
    }
};