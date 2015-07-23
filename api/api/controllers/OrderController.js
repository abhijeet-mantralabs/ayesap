/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

//res.json({message: "Retailer successfully registered", details:{ user: user}});

module.exports = {
    bookOrder: function(req, res){
//        sails.log.debug("addTaskpayload overall------ >>>>   ")
//        sails.log.debug(JSON.stringify(addTaskPayload));
//        console.log(req.body);
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
            orderStatusBackend: "req-not-received",
            orderStatusTrail:[],
            lastStatus: "req-not-received",
            currentStatus : "req-not-received"
        }
        console.log("book now api time---->>",req.body.bookNowTime);

        if(req.body.bookNowTime){
            orderDBPayload.bookNowTime = req.body.bookNowTime;
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
                                        "value": retailerDetails.mobile
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

                }else{
                    addTaskPayload["zoneid"] = retailerDetails.zone
                }
                if(req.body.CODValue){

                    var CODValueEntry = {
                        "name": "COD Value",
                        "value": req.body.CODValue
                    }
                    addTaskPayload.payload.payload.task.field.push(CODValueEntry);
                    order.CODValue = req.body.CODValue;

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

                    }else{
                        sails.log.debug("customer saved");
                        sails.log.debug("addTaskpayload overall------ >>>>   ");
                        sails.log.debug(JSON.stringify(addTaskPayload));
                        sails.log.debug("addTaskpayload actual ------ >>>>   ");
                        sails.log.debug(JSON.stringify(addTaskPayload.payload));

                        OrderService.createOrder(addTaskPayload, function(err, response){
                            if(err){
                                console.log("error in order controller book order--->>");
                                res.status(err.status).json(err);
                            }else{
//                        {"output":{"status":201,"data":{"taskid":["FV-9-01678"]}}}
//                         '{"output":{"status":403,"data":{"errorcode":"403105","message":"Currently no shift is running with resources"}}}'

                                response = JSON.parse(response);
                                sails.log.debug("object like output-->>>>>");
                                sails.log.debug(response.output);
                                order.customerId = customer.customerId;

                                if(customerDetails.address){
                                    var fullAdd = customerDetails.address.address + " " + customerDetails.address.street+ " " + customerDetails.address.area+ " " +  customerDetails.address.city+ " " + customerDetails.address.pinCode;
                                    order.custFullAddress = fullAdd;
                                }
                                if(customerDetails.name){
                                    order.custName = customerDetails.name;
                                }
                                if(response.output.status == 201){
                                    order.taskId = response.output.data.taskid[0];
                                    order.orderStatusBackend = "Pending";
                                    order.lastStatus = "req-not-received";
                                    order.currentStatus = "Pending";
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
        var latestOrderStatus = req.body;


        if(latestOrderStatus.token == "taskstatus"){
            OrderStatus.createOrderStatus(latestOrderStatus, function(err, savedOrderStatus){
                if(err){
                    res.status(err.status).json(err);
                }else{

                    Order.fetchOrderByTaskId({taskId:latestOrderStatus.taskid }, function(err, matchedOrder){
//                        same as before but will be updated
                        matchedOrder.orderStatusTrail.push(latestOrderStatus.id);
                        matchedOrder.updateTime = latestOrderStatus.updatetime ;
                        matchedOrder.currentStatus =  sails.config.globals.taskStatusDesc[latestOrderStatus.currentstatus] ;
                        matchedOrder.lastStatus = sails.config.globals.taskStatusDesc[latestOrderStatus.lastStatus] ;
                        matchedOrder.orderStatusBackend = sails.config.globals.taskStatusDesc[latestOrderStatus.currentstatus] ;

//                        only when order event updated like completed
                        matchedOrder.resId = latestOrderStatus.resid ;
                        matchedOrder.resMobile = latestOrderStatus.mobile ;
                        matchedOrder.resName = latestOrderStatus.resname ;
                        matchedOrder.resLastUpdatedLat = latestOrderStatus.lat;
                        matchedOrder.resLastUpdatedLong = latestOrderStatus.lng ;
                        Order.updateOrder(matchedOrder , function(err, matchedUpdatedOrder){
                            if(err){
                                sails.log.error("err in updating order with latest order status details->>>")
                                res.status(err.status).json(err);
                            }else{
                                sails.log.debug("original order status saved to DB and updated at main order collection----- >>", savedOrderStatus)
                                res.json({message: "request registered", details: "original order status saved"} );
                            }
                        })

                    })
                }
            })
        }else{
            sails.log.debug("token is different")
            res.json({message: "update order status request not registered", details: "order not saved, wrong"} );
        }

    },
    getOrdersByRetailer: function(req, res){
        Order.fetchOrderByRetailerId({retailerId: req.body.retailerId} , function(err, Orders){
            if(err){
                sails.log.error("err in fetching order by retailer id->>>")
                res.status(err.status).json(err);
            }else{
                res.json({message: "order fetched", details: Orders} );
            }
        })
        //      sample-payload = { retailerId: "", mobile: ""}
//        {
//            "orderStatusId": [],
//            "retailerId": "0009",
//            "retailerMobile": 1234567811,
//            "customerMobile": 1234567821,
//            "paymentType": "COD",
//            "orderAmount": 2000,
//            "orderStatusBackend": "successfully-assigned",
//            "orderId": "0002",
//            "createdAt": "2015-07-20T08:29:29.494Z",
//            "updatedAt": "2015-07-20T08:29:29.891Z",
//            "taskId": "FV-9-01917",
//            "customerId": "0001",
//            "id": "55acb16941d80c851c010b6e",
//        orderStatusTrail.push(latestOrderStatus.id);
//       resId = latestOrderStatus.resid ;
//       resMobile = latestOrderStatus.mobile ;
//       resName = latestOrderStatus.resname ;
//        currentStatus =  sails.config.globals.taskStatusDesc[latestOrderStatus.currentstatus] ;
//     lastStatus = sails.config.globals.taskStatusDesc[latestOrderStatus.lastStatus] ;
//        orderStatusBackend = sails.config.globals.taskStatusDesc[latestOrderStatus.currentstatus] ;
//        resLastUpdatedLat = latestOrderStatus.lat;
//        resLastUpdatedLong = latestOrderStatus.lng ;
//        updateTime = latestOrderStatus.updatetime ;
//
// }

    }
};

