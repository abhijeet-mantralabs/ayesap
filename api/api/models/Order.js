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
        orderStatusIds:{
            type:'array'
        },
        taskId:{
            type:'string',
            unique: true
        },
        retailerId:{
            type:'string'
        },
        retailerMobile:{
            type: 'integer'
        },
        customerId:{
            type:'string'
        },
        customerMobile:{
            type: 'integer'
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
        }

    },
    registerOrder:function(opts, cb){
        Order.find().max('orderId').exec(function(err, order){
            if(err){
                console.log("max error in fetching order from db ---- ---->> ", err)
                cb(err);
            }else{
                console.log("max orderid: ------ >> ", order);
                if(order.length == 0){
                    id = "" +   order.length+1;
                }else{
                    id = ""  +  (parseInt(order[0].orderId) + 1)
                }
                var pad = "0000";
                var orderId =  pad.substring(0, pad.length - id.length) + id;
                console.log("generated  order Id ->>>>",  orderId)
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

                Order.update({orderId:opts.orderId}, opts ,  function (err, orderUpdated) {
                    if (!err){
                        cb(null, orderUpdated[0]);
                    }else{
                        cb(err);
                    }
                });

            }
        });
    }
}
