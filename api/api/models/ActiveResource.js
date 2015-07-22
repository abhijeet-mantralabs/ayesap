///**
// * Created by abhijeetgupta on 17/07/15.
// */
////{
////    " id ": "CAP7a",
////    " name ": "cp1a",
////    " maxcapacity ": 15,
////    " usedcapacity": 5,
////    " resource type": "General",
////    " mobile": "918197322665",
////    " lat": "12.976328",
////    " lng": "77.634270"
////},
//
//module.exports = {
//
//    attributes: {
//        resId: {
//            type: 'string'
//        },
//        name:{
//            type: 'string'
//        },
//        maxcapacity:{
//            type: 'integer'
//        },
//        usedcapacity:{
//            type: 'integer'
//        },
//        resourcetype:{
//            type: 'string'
//        },
//        mobile:{
//            type: 'integer'
//        },
//        lat:{
//            type: 'string'
//        },
//        lng:{
//            type: 'string'
//        }
//    },
//    saveUp:function(opts,cb){
//        sails.log.debug("opts acin db function ----  >> ", opts);
//
//        ActiveResource.create(opts, function(err, res){
//            if(err){
//                cb(err);
//            }else{
//                cb(null,user);
//            }
//        });
//    },
//    listResources: function (req, cb) {
//        Resource.find().exec(function(err, resources){
//            if(err){
//                cb(err);
//            }else if(resources){
//                cb(null, resources);
//            }
//        });
//    }
//};