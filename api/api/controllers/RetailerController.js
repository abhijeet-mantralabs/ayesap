/**
 * RetailerController
 *
 * @description :: Server-side logic for managing retailers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var retailerId
module.exports = {
    reqForRegister: function(req, res){
        function generateAutoIncId(retailers){
            console.log("retailers------>>",retailers);
            if(retailers.length == 0){
                var str = "" + (retailers.length+1);
            }else if(retailers.length > 0){
                var str = "" + (parseInt(retailers[retailers.length-1].retailerId) + 1);
            }
            var pad = "0000";
            var id =  pad.substring(0, pad.length - str.length) + str;
            return id;
        }
        if(!req.body || !req.body.mobile ||  !req.body.name){
            res.status(400).json({error: "some field(s) missing"});
        }else{
            console.log(req.body);
            Retailer.listRetailers(req.body, function (err, retailers) {
                if (err) {
                    res.status(err.status).json({message: err});
                } else {
                    req.body.retailerId = generateAutoIncId(retailers);
                    Retailer.requestSignUp(req.body, function(err, user){
                        if(err) {
                            res.status(err.status).json(err);
                        }
                        else{
                            console.log(user)
                            res.json({message: "request registered", details:{ user: user}} );
                        }
                    });
                }
            });
        }
    },
    registerRetailerAdmin : function(req, res){
        console.log(req.body)
        if(!req.body || !req.body.mobile || !req.body.name || !req.body.address  || !req.body.street || !req.body.area || !req.body.city || !req.body.state || !req.body.country || !req.body.pincode || !req.body.retailerType) {
            res.status(400).json({error: "some field(s) missing"});
        }
        else{
            console.log(req.body);
            Retailer.signUp(req.body, function(err, user){
                if(err)
                    res.serverError(err);
                else{
                    sails.log.debug()
                    res.json({message: "Retailer successfully registered", details:{ user: user}});
                }
            });
        }
    },
    login : function(req, res){
        if(!req.body || !req.body.email || !req.body.password)
            res.badRequest('Email or password missing in request');
        else{
            Retailer.login(req.body, function(err, user){
                if(err){
                    res.serverError(err);
                }
                else{
                    req.session.authenticated = true;
                    req.session.user = user;
                    res.json("You are logged in");
                    // console.log(req.session.user);
                }
            });
        }
    },
    getRetailerList: function (req, res) {
        Retailer.listRetailers(req.body, function (err, retailers) {
            if (err) {
                res.status(err.status).json({error: err});
            } else {
                res.json({ details:{ retailerList: user}} );
            }
        });
    },


    getRetailerDetail: function (req, res) {
        var userId = req.param('id');
        if (userId) {
            Retailer.userDetail(userId, function (err, data) {
                if (err) {
                    res.forbidden();
                    //res.send(err);
                } else {
                    res.json(data);
                }
            });
        } else {
            res.json({errorType: "UserID", errorMessage: "User ID is missing"});
        }
    }
};

