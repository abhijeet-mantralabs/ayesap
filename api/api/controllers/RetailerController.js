/**
 * RetailerController
 *
 * @description :: Server-side logic for managing retailers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var retailerId
module.exports = {
    reqForRegister: function(req, res){
//        function generateAutoIncId(retailers){
//            if(retailers.length == 0){
//                var str = "" + (retailers.length+1);
//            }else if(retailers.length > 0){
//                var str = "" + (parseInt(retailers[retailers.length-1].retailerId) + 1);
//            }
//            var pad = "0000";
//            var id =  pad.substring(0, pad.length - str.length) + str;
//            return id;
//        }
        if(!req.body || !req.body.mobile ||  !req.body.name){
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }else{
            console.log("req body-->>",req.body);

//            Retailer.listRetailers(req.body, function (err, retailers) {
//                if (err) {
//                    res.status(err.status).json(err);
//                } else {
//                    req.body.retailerId = generateAutoIncId(retailers);
                    Retailer.requestSignUp(req.body, function(err, user){
                        if(err) {
                            res.status(err.status).json(err);
                        }
                        else{
                            console.log(user)
                            delete user.createdAt;
                            delete user.updatedAt;
                            res.json({message: "request registered", details:{ user: user}} );
                        }
                    });
//                }
//            });
        }
    },
    registerRetailerAdmin : function(req, res){
        console.log(req.body)
        if(!req.body || !req.body.retailerId || !req.body.mobile || !req.body.name || !req.body.address  || !req.body.street || !req.body.area || !req.body.city || !req.body.state || !req.body.country || !req.body.pincode || !req.body.latitude || !req.body.longitude || !req.body.zone) {
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }
        else{
            console.log(req.body);
            Retailer.signUp(req.body, function(err, user){
                if(err)
                    res.status(err.status).json(err);
                else{

                    delete user.createdAt;
                    delete user.updatedAt;
                    delete user.password;
                    res.json({message: "Retailer successfully registered", details:{ user: user}});
                }
            });
        }
    },
    login : function(req, res){

        console.log(req.body);
        if(!req.body || !req.body.password || (!req.body.mobile && !req.body.email) ){
            console.log('in 400');
            res.status(400).json( {status: 400 , message: "missing credentials" });
        } else {
            Retailer.login(req.body, function(err, user){
                if(err){
                    res.status(err.status).json(err);
                }
                else{
                    console.log(user)
                    req.session.authenticated = true;
                    req.session.user = user;
                    delete user.createdAt;
                    delete user.updatedAt;
                    delete user.password
                    console.log("req session auth ", req.session.authenticated);
                    console.log("req session ", req.session.user);
                    res.json({message: "Retailer logged in successfully", details:{ user: user}});
                    // console.log(req.session.user);
                }
            });
        }
    },
    logout: function(req, res){
        if( req.session.authenticated == false && req.session.user == null){
            res.status(400).json({status: 400 , message: "user already logged out" })
        }else {
            req.session.authenticated = false;
            req.session.user =  null;
            res.json({message: "user logged out successfully"});
        }


    },
    isLoggedIn: function(req, res){

//        if(!req.body || !req.body.retailerId ||  !req.body.mobile || !req.body.registrationStatus){
//            res.status(400).json( {status: 400 , message: "some field(s) missing" });
//        }else{
            console.log("islogged in ------ >>>>")
            console.log(req.session.authenticated)
            console.log(req.session.user);
            console.log(req.body);
            if(req.session && req.session.authenticated && req.session.user){
                res.json({message: "logged In",details:{ user: req.session.user}});
            }else{
                res.status(401).json({status: 401 , message: "not loggedIn" })
            }
//        }
    },
    getRetailerList: function (req, res) {
        Retailer.listRetailers(req.body, function (err, retailers) {
            if (err) {
                res.status(err.status).json({error: err});
            } else {
                res.json({ details:{ retailerList: retailers}} );
            }
        });
    },
    updateDetails : function(req, res){
        console.log(req.body)
        if(!req.body || !req.body.retailerId || !req.body.mobile || !req.body.name || !req.body.address  || !req.body.street || !req.body.area || !req.body.city || !req.body.state || !req.body.country || !req.body.pincode || !req.body.retailerType || !req.body.latitude || !req.body.longitude || !req.body.zone) {
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }
        else{
            console.log(req.body);
            Retailer.updateRetailer(req.body, function(err, user){
                if(err)
                    res.status(err.status).json(err);
                else{

                    delete user.createdAt;
                    delete user.updatedAt;
                    delete user.password;
                    res.json({message: "Retailer successfully updated", details:{ user: user}});
                }
            });
        }
    },
    declineUser : function(req, res) {
        if(!req.body || !req.body.retailerId || !req.body.mobile) {
            res.status(400).json( {status: 400 , message: " retailer Id or mobile no. is missing" });
        }
        else{
            console.log(req.body);
            req.body.registrationStatus =  "declined";
            Retailer.updateRetailer(req.body, function(err, user){
                if(err)
                    res.status(err.status).json(err);
                else{

                    delete user.createdAt;
                    delete user.updatedAt;
                    delete user.password;
                    res.json({message: "Retailer successfully declined", details:{ user: user}});
                }
            });
        }
    },
    changePassword: function(req, res){
//        req.body = {"retailerId": "0002", "oldPlainPass":"IXRbBZ", "newPlainPass": "welcome123"}
        if(!req.body || !req.body.retailerId || !req.body.oldPlainPass || !req.body.newPlainPass) {
            res.status(400).json( {status: 400 , message: " some field(s) missing" });
        }
        else{
//            console.log(req.body);
//            req.body.registrationStatus =  "declined";
            Retailer.changePassword(req.body, function(err, user){
                if(err)
                    res.status(err.status).json(err);
                else{

                    delete user.createdAt;
                    delete user.updatedAt;
                    delete user.password;
                    res.json({message: "Password successfully changed"});
                }
            });
        }
    }


//
//    getRetailerDetail: function (req, res) {
////        var userId = req.param('id');
//        if (userId) {
//            Retailer.userDetail(userId, function (err, data) {
//                if (err) {
//                    res.forbidden();
//                    //res.send(err);
//                } else {
//                    res.json(data);
//                }
//            });
//        } else {
//            res.json({errorType: "UserID", errorMessage: "User ID is missing"});
//        }
//    }
};

