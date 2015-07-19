/**
 * Created by abhijeetgupta
 */
module.exports = {
    attributes: {
        orderId: {
            type: 'string'
        },
        taskId:{
            type:'string'
        },
        lastStatus:{
            type: 'integer'
        },
        currentStatus:{
            type: 'integer'
        },
        updatetime:{
            type: 'datetime'
        },
        orderAmount: {
            type: 'string',
            required: true
        },
        CODValue:{
            type: 'string'
        },
        resId:{
            type: 'string'
        },
        resName:{
            type: 'string'
        },
        mobile:{
            type: 'integer'
        },
        lat:{

        },
        long:{

        }

    }
}

