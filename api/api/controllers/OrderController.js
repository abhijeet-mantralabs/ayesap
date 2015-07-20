/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

//res.json({message: "Retailer successfully registered", details:{ user: user}});

module.exports = {
    bookOrder: function(req, res){
        console.log(req.body);
        /** for backend-->>
         * take order details, call order model to save it on db with orderId, return full order details with orderId, (will be used in add task payload)
         * take customer Details(will be used in add task payload) , call customer Model to save it on db with mongodb default id
         * make payload according to addtask service payload,
         * get taskid store against 1 order Id
        **/
        var retailerDetails = req.body.retailerDetails;
        var customerDetails = req.body.customerDetails;
        var orderDBPayload = {
            orderStatusId : [],
            retailerId: retailerDetails.retailerId ,
            retailerMobile : retailerDetails.mobile,
            customerMobile: customerDetails.mobile,
            paymentType: req.body.paymentType,
            orderAmount: req.body.orderAmount,
            orderStatusBackend: "notassigned"
        }

        var customerDBPayload = {
            mobile: customerDetails.mobile
        }

        Order.registerOrder(orderDBPayload, function(err, order){
            if(err) {
                console.log("order not initially saved to db")
                res.status(err.status).json(err);
            }
            else{
                console.log("order initially Saved--->>", order)
                var addTaskPayload = {
                    zoneid : retailerDetails.zone,
                    payload:{
                        payload: {
                            task: {
                                field: [
                                    {
                                        name: "Order ID",
                                        value: order.orderId
                                    },
                                    {
                                        name: "Retailer Phone Number",
                                        value: retailerDetails.mobile
                                    },


                                    {
                                        "name": "Customer Phone Number",
                                        "value": customerDetails.mobile
                                    },
                                    {
                                        "name": "Pick-up Address",
                                        "value": {
                                            "address": [
                                                {
                                                    "name": "Street",
                                                    "value": retailerDetails.address
                                                },
                                                {
                                                    "name": "Street1",
                                                    "value": retailerDetails.street
                                                },
                                                {
                                                    "name": "Area",
                                                    "value": retailerDetails.area
                                                },
                                                {
                                                    "name": "City",
                                                    "value": retailerDetails.city
                                                },
                                                {
                                                    "name": "Pincode",
                                                    "value": retailerDetails.pincode
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
                                        "name": "Retailer ID",
                                        "value": retailerDetails.retailerId
                                    },
                                    {
                                        "name": "Retailer Name",
                                        "value": retailerDetails.name
                                    },
                                    {
                                        "name": "Retailer Type",
                                        "value": retailerDetails.retailerType
                                    }
                                ]
                            }
                        }
                    }

                }

                if(customerDetails.address){
                    console.log("adrress is there")
                   var customerAddressObj =  {
                        "name": "Customer Address",
                        "value": {
                        "address": [
                            {
                                "name": "Street",
                                "value": customerDetails.address.address
                            },
                            {
                                "name": "Street1",
                                "value":  customerDetails.address.street
                            },
                            {
                                "name": "Area",
                                "value": customerDetails.address.area
                            },
                            {
                                "name": "City",
                                "value":  customerDetails.address.city
                            },
                            {
                                "name": "Pincode",
                                "value": customerDetails.address.pinCode
                            }
                        ]
                    }
                   }
                   addTaskPayload.payload.payload.task.field.push(customerAddressObj);
                    customerDBPayload.address = customerDetails.address.address;
                    customerDBPayload.street = customerDetails.address.street,
                    customerDBPayload.area = customerDetails.address.area,
                    customerDBPayload.city = customerDetails.address.city,
                    customerDBPayload.pincode = customerDetails.address.pinCode

                }
                if(req.body.CODValue){

                    var CODValueEntry = {
                        "name": "COD Value",
                        "value": req.body.CODValue
                    }
                    addTaskPayload.payload.payload.task.field.push(CODValueEntry);
                    orderDBPayload.CODValue = req.body.CODValue

                }

                if(customerDetails.name){
                    console.log("name is there")
                    var customerNameObj = {
                        "name": "Customer Name",
                        "value": customerDetails.name
                    }
                    customerDBPayload.name = customerDetails.name;
                    addTaskPayload.payload.payload.task.field.push(customerNameObj);
                }
//                addTaskPayload.zoneid =
//                addTaskPayload.zoneid = 7; //  hardcoded
//                res.json({message: "order successfully booked", details:{ order: addTaskPayload.payload}});
                Customer.createCustomer(customerDBPayload, function(err, customer){
                    if(err){
                        sails.log.error("failed to save customer on db")
                    }else{
                        sails.log.debug("customer saved")

                        OrderService.createOrder(addTaskPayload, function(err, response){
                            if(err){
                                console.log("error in order controller book order--->>")
                                res.status(err.status).json(err);
                            }else{
//                        {"output":{"status":201,"data":{"taskid":["FV-9-01678"]}}}
//                         '{"output":{"status":403,"data":{"errorcode":"403105","message":"Currently no shift is running with resources"}}}'

                                response = JSON.parse(response)
                                sails.log.debug("object like output-->>>>>")
                                sails.log.debug(response.output)
                                if(response.output.status == 201){
                                    order.taskId = response.output.data.taskid[0];
                                    order.customerId = customer.customerId;
                                    order.orderStatusBackend = "successfully-assigned"
                                    Order.updateOrder(order, function(err, order){
                                        if(err) {
                                            res.status(err.status).json(err);
                                        }
                                        else{

                                            sails.log.debug("order saved to db")
                                            res.json({message: "Your request has been received successfully", details:{ order: order}});
                                        }
                                    })
                                }else if(response.output.status == 403){
                                    res.status(403).json( {status: response.output.data.errorcode , message: response.output.data.message });
                                }else if(response.output.status == 404){
                                    res.status(404).json( {status: response.output.data.errorcode , message: response.output.data.message });
                                }
                            }
                        })
                    }
                })
//                res.json({message: "order successfully booked", payload: addTaskPayload.payload});

            }
        });
    },
    getOrderStatus: function(req, res){
        sails.log(req.body)
//        orderStatus = JSON.parse(req.body);
        sails.log(req.body);
        if(req.body.token == "taskstatus"){
            OrderStatus.createOrderStatus(req.body, function(err, savedOrderStatus){
                if(err){
                    res.status(err.status).json(err);
                }else{
                    res.json({message: "request registered", details: "order status saved"} );
                }
            })
        }else{
            sails.log.debug("token is different")
//            res.json({message: "request registered", details: "order not saved, wrong"} );
        }

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