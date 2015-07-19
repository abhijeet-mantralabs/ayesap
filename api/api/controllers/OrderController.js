/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    bookOrder: function(req, res){
        console.log(req.body);


//
//        var frontEndPayload = {
//            retailerDetails:{
//                retailerId:"",
//                name: "",
//                retailerType:"",
//                mobile:"",
//                address:"",
//                street:"",
//                area: "",
//                city:"",
//                pincode:"",
//                latitude:"",
//                longitude: "",
//                zone: ""
//            },
//            customerDetails:{
//                name:"",
//                mobile:"",
//                address:{
//                    address:"",
//                    street:"",
//                    area:"",
//                    city:"",
//                    pinCode:""
//                }
//            },
//            orderAmount:"",
//            paymentType:"",
//            CODValue:""
//        }
        /** for backend-->>
         * take order details, call order model to save it on db with orderId, return full order details with orderId, (will be used in add task payload)
         * take customer Details(will be used in add task payload) , call customer Model to save it on db with mongodb default id
         * make payload according to addtask service payload,
         * get taskid store against 1 order Id
        **/

        var orderDBPayload = {
            orderStatusId : [],
            paymentType: req.body.paymentType,
            orderAmount: req.body.orderAmount,
            CODValue: req.body.CODValue

        }
        var customer = req.body.customerDetails;
        var customerDBPayload = {
            name: customer.name,
            address: customer.address.address,
            street: customer.address.street,
            area: customer.address.area,
            city: customer.address.city,
            pinCode: customer.address.pinCode,
            mobile: customer.mobile
        }


        var retailer = req.body.retailerDetails;
        Order.registerOrder(orderDBPayload, function(err, order){
            if(err) {
                console.log("order not initially saved to db")
                res.status(err.status).json(err);
            }
            else{
                console.log("order initially Saved--->>", order)

                var addTaskPayload = {
                    "zoneid" : req.body.retailerDetails.zone,
                    "payload":{
                        "payload": {
                            "task": {
                                "field": [
                                    {
                                        "name": "Order ID",
                                        "value": order.orderId
                                    },
                                    {
                                        "name": "Retailer Phone Number",
                                        "value": req.body.retailerDetails.mobile
                                    },


                                    {
                                        "name": "Customer Phone Number",
                                        "value": req.body.customerDetails.mobile
                                    },
                                    {
                                        "name": "Pick-up Address",
                                        "value": {
                                            "address": [
                                                {
                                                    "name": "Street",
                                                    "value": req.body.retailerDetails.address
                                                },
                                                {
                                                    "name": "Street1",
                                                    "value": req.body.retailerDetails.street
                                                },
                                                {
                                                    "name": "Area",
                                                    "value": req.body.retailerDetails.area
                                                },
                                                {
                                                    "name": "City",
                                                    "value": req.body.retailerDetails.city
                                                },
                                                {
                                                    "name": "Pincode",
                                                    "value": req.body.retailerDetails.pincode
                                                },
                                                {
                                                    "name": "lat",
                                                    "value": req.body.retailerDetails.latitude
                                                },
                                                {
                                                    "name": "lng",
                                                    "value": req.body.retailerDetails.longitude
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "name": "Payment Type",
                                        "value": "COD"
                                    },
                                    {
                                        "name": "Order Amount",
                                        "value": req.body.orderAmount
                                    },
                                    {
                                        "name": "COD Value",
                                        "value": req.body.CODValue
                                    },
                                    {
                                        "name": "Retailer ID",
                                        "value": req.body.retailerDetails.retailerId
                                    },
                                    {
                                        "name": "Retailer Name",
                                        "value": req.body.retailerDetails.name
                                    },
                                    {
                                        "name": "Retailer Type",
                                        "value": req.body.retailerDetails.retailerType
                                    }
                                ]
                            }
                        }
                    }

                }
                if(customer.address){
                   var customerAddressObj =  {
                        "name": "Customer Address",
                        "value": {
                        "address": [
                            {
                                "name": "Street",
                                "value": customer.address.address
                            },
                            {
                                "name": "Street1",
                                "value":  customer.address.street
                            },
                            {
                                "name": "Area",
                                "value": customer.address.area
                            },
                            {
                                "name": "City",
                                "value":  customer.address.city
                            },
                            {
                                "name": "Pincode",
                                "value": customer.address.pinCode
                            }
                        ]
                    }
                   }
                   addTaskPayload.payload.payload.task.field.push(customerAddressObj);

                }
                if(customer.name){
                    var customerNameObj = {
                        "name": "Customer Name",
                        "value": customer.name
                    }
                    addTaskPayload.payload.payload.task.field.push(customerNameObj);
                }
                addTaskPayload.zoneid = 7; //  hardcoded

                console.log("addTaskFinal Payload --- >>>")
                console.log(addTaskPayload)
                console.log(addTaskPayload.payload.payload.task.field)
                console.log("addTaskFinal Payload  ends--- >>>")
//                res.json({message: "order successfully booked", details:{ order: addTaskPayload.payload}});
                OrderService.createOrder(addTaskPayload, function(err, response){
                    if(err){
                        console.log("error in order controller book order--->>")
                        res.status(err.status).json(err);
                    }else{
//                        {"output":{"status":201,"data":{"taskid":["FV-9-01678"]}}}
                        order.taskId = response.output.data.taskid[0];
                        res.json({message: "order successfully booked", details:{ order: response}});

                    }
                })
            }
        });
    },
    getOrderStatus: function(req, res){

    }
};

//{
//    "dateformat":"2015-06-14",  service
//    "route":0,   service
//    "payload": {
//    "task": {
//        "field": [
//
//            {
//                "name": "Order ID",
//                "value": "ORDAT00001"
//            },
//            {
//                "name": "Retailer Phone Number",
//                "value": "1234567892"
//            },
//            {
//                "name": "Customer Name",
//                "value": "test-customer"
//            },
//            {
//                "name": "Customer Address",
//                "value": {
//                    "address": [
//                        {
//                            "name": "Street",
//                            "value": "DQ Labs, 6th Main Rd Indira Nagar III Stage"
//                        },
//                        {
//                            "name": "Street1",
//                            "value": "Binnamangala, Hoysala Nagar"
//                        },
//                        {
//                            "name": "Area",
//                            "value": "Indiranagar"
//                        },
//                        {
//                            "name": "City",
//                            "value": "Bangalore"
//                        },
//                        {
//                            "name": "Pincode",
//                            "value": "560038"
//                        }
//                    ]
//                }
//            },
//            {
//                "name": "Customer Phone Number",
//                "value": "1234567821"
//            },
//
//            {
//
//                "name": "Pick-up Address",
//
//                "value": {
//
//                    "address": [
//
//                        {
//
//                            "name": "Street",
//
//                            "value": "Myntra office AKR tech park"
//
//                        },
//
//                        {
//
//                            "name": "Street1",
//
//                            "value": ""
//
//                        },
//
//                        {
//
//                            "name": "Area",
//
//                            "value": "Kudlu"
//
//                        },
//
//                        {
//
//                            "name": "City",
//
//                            "value": "Bangalore"
//
//                        },
//
//                        {
//
//                            "name": "Pincode",
//
//                            "value": "560068"
//
//                        },
//
//                        {
//
//                            "name": "lat",
//
//                            "value": ""
//
//                        },
//
//                        {
//
//                            "name": "lng",
//
//                            "value": ""
//
//                        }
//
//                    ]
//
//                }
//
//            },
//
//            {
//
//                "name": "Payment Type",
//
//                "value": "COD"
//
//            },
//
//            {
//
//                "name": "Order Amount",
//
//                "value": "200"
//
//            },
//
//            {
//
//                "name": "COD Value",
//
//                "value": "2000"
//
//            },
//
//            {
//
//                "name": "Retailer ID",
//
//                "value": "RT001"
//
//            },
//
//            {
//
//                "name": "Retailer Name",
//
//                "value": "Food Palace"
//
//            },
//
//            {
//
//                "name": "Retailer Type",
//
//                "value": "Restaurant"
//
//            }
//
//        ]
//
//    }
//
//}
//
//}