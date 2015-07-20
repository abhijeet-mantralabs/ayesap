/**
 * Created by abhijeetgupta
 */
module.exports = {
    attributes: {
        orderid: {
            type: 'string'
        },
        taskid:{
            type:'string',
            required: true
        },
        laststatus:{
            type: 'string'
        },
        currentstatus:{
            type: 'string'
        },
        updatetime:{
            type: 'string'
        },
        CODValue:{
            type: 'string'
        },
        resid:{
            type: 'string'
        },
        resname:{
            type: 'string'
        },
        mobile:{
            type: 'integer'
        },
        lat:{
            type: 'string'
        },
        lng:{
            type: 'string'
        },
        token:{
            type: 'string'
        }

    },
    createOrderStatus: function(opts, cb){

        OrderStatus.create(opts, function(err, savedOrderStatus){
            if(err){
                cb(err);
            }else{
                cb(null,savedOrderStatus);
            }
        });
    }
}

