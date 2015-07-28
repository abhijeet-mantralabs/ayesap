/**
 * Created by abhijeetgupta on 28/07/15.
 */


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
        zoneId: {
            type: 'string',
            unique: true,
            required: true
        },
        lastUpdated:{
            type: 'datetime'
        },
        resourceIds:{
            type: 'array'
        }
    },
    saveZone:function(opts,cb){
        Zone.findOne({zoneId:opts.zoneId}).exec(function(err, zone){
            if(err){
                cb(err);
            }else if(!zone){
                Zone.create(opts, function(err, savedZone){
                    if(err){
                        cb(err);
                    }else{
                        cb(null,savedZone);
                    }
                });
            }else if(zone){
                Zone.update({zoneId:opts.zoneId}, opts ,  function (err, zoneUpdated) {
                    if (!err){
                        cb(null, zoneUpdated[0]);
                    }else{
                        cb(err);
                    }
                });
            }
        });
    },
    listofUpdatesZones: function (req, cb) {
        Zone.find().exec(function(err, zones){
            if(err){
                cb(err);
            }else if(zones){
                cb(null, zones);
            }
        });
    }
};