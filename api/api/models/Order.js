/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
        orderId: {
            type: 'string',
            unique: true,
            required: true
        },
        orderStatusId:{
            type:'array'
        },
        taskId:{
            type:'string'
        },
        retailerId:{
            type:'string'
        },
        retailerMobile:{
            type: 'string'
        },
        customerId:{
            type:'string'
        },
        customerMobile:{
            type: 'string'
        },
        paymentType:{
           type: 'string',
           required:true
        },
        orderAmount: {
            type: 'integer',
            required: true
        },
        CODValue:{
            type: 'integer'
        },
        orderStatusBackend:{
            type: "string"
        },
        resId:{
            type: "string"
        },
        resMobile:{
            type: "string"
        },
        lastStatus:{
            type: "string"
        },
        currentStatus:{
            type: "string"
        },
        updateTime:{
            type: "string"
        },
        resLastUpdatedLat:{
            type: "string"
        },
        resLastUpdatedLong:{
            type: "string"
        },
        orderStatusTrail:{
            type: "array"
        },
        resName:{
            type: "string"
        },
        bookNowTime:{
            type: "string"
        },
        custFullAddress:{
            type: "string"
        },
        custName:{
            type: "string"
        },
        bookNowResType:{
            type:"string"
        }


    },
    registerOrder:function(opts, cb){
        Order.find().max('orderId').exec(function(err, order){
            if(err){
                sails.log.debug("max error in fetching order from db ---- ---->> ", err)
                cb(err);
            }else{
                sails.log.debug("max orderid: ------ >> ", order);
                if(order.length == 0){
                    id = "" +   order.length+1;
                }else{
                    id = ""  +  (parseInt(order[0].orderId) + 1)
                }
                var pad = "0000";
                var orderId =  pad.substring(0, pad.length - id.length) + id;
                sails.log.debug("generated  order Id without retailer name->>>>",  orderId);
                orderId = orderId + opts.retailerName.toLowerCase().replace(" ", "")  ;
                sails.log.debug("generated  final order Id with retailer name->>>>",  orderId);
                opts.orderId = orderId;
                Order.create(opts, function(err, savedOrder){
                    if(err){
                        cb(err);
                    }else{
                        cb(null,savedOrder);
                    }
                });
            }
        });
    },
    updateOrder: function(opts, cb){
        Order.findOne({orderId:opts.orderId}).exec(function(err, order){
            if(err){
                cb(err);
            }else if(!order){
                console.log("no order registered with this Id")
            }else if(order){

                Order.update({orderId:opts.orderId}, opts,  function (err, orderUpdated) {
                    if (!err){
                        cb(null, orderUpdated[0]);
                    }else{
                        cb(err);
                    }
                });

            }
        });
    },
    fetchOrderByTaskId: function(opts, cb){
        Order.findOne({taskId:opts.taskId}).exec(function(err, order){
            if(err){
                console.log(" error in fetching order against task from db ---- ---->> ", err)
                cb(err);
            }else{
                cb(null, order);
            }
        });
    },
    fetchOrderByRetailerId: function(opts, cb){
        Order.find({retailerId:opts.retailerId}).exec(function(err, order){
            if(err){
                console.log(" error in fetching order against task from db ---- ---->> ", err)
                cb(err);
            }else{
                cb(null, order);
            }
        });
    }
}
