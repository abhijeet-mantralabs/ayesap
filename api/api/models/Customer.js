/**
 * Created by abhijeetgupta .
 */
module.exports = {
    attributes: {
        customerId: {
            type: 'string',
            unique: true,
            required: true
        },
        name: {
            type: 'string'
        },
        address:{
            type: 'string'
        },
        street:{
            type: 'string'
        },
        area:{
            type: 'string'
        },
        city:{
            type: 'string'
        },
        pinCode:{
            type: 'integer'
        },
        mobile:{
            type: 'string',
            required: true
        }
    },
    createCustomer:function(opts, cb){
        Customer.findOne({mobile:opts.mobile}).exec(function(err, customer){
            if(err){
                cb(err);
            }else if(!customer){
                Customer.find().max('customerId').exec(function(err, customer){
                    if(err){
                        console.log("max error in fetching customer from db ---- ---->> ", err)
                        cb(err);
                    }else{
                        console.log("max customerid: ------ >> ", customer);
                        if(customer.length == 0){
                            id = "" +   customer.length+1;
                        }else{
                            id = ""  +  (parseInt(customer[0].customerId) + 1)
                        }
                        var pad = "0000";
                        var customerId =  pad.substring(0, pad.length - id.length) + id;
                        console.log("generated  customer Id ->>>>",  customerId)
                        opts.customerId = customerId;
                        Customer.create(opts, function(err, savedCustomer){
                            if(err){
                                cb(err);
                            }else{
                                cb(null,savedCustomer);
                            }
                        });
                    }
                });
            }else if(customer){

                    Customer.update({mobile:opts.mobile}, opts ,  function (err, customerUpdated) {
                        if (!err){
                            cb(null, customerUpdated[0]);
                        }else{
                            cb(err);
                        }
                    });

            }
        });



    }
}
