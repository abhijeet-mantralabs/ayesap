/**
 * RetailerController
 *
 * @description :: Server-side logic for managing retailers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var retailerId
module.exports = {
    reqForRegister: function(req, res){
        if(!req.body || !req.body.mobile ||  !req.body.name){
            res.badRequest('bad request: field(s) missing');
            sails.log.debug('bad request: field(s) missing');
        }else{
            console.log(req.body);
            Retailer.requestSignUp(req.body, function(err, user){
                if(err) {
                    res.serverError(err);
                    console.log(err);
                }
                else{
                    console.log(user)
                    res.json({message: "request registered", details:{ user: user}} );
                }
            });
        }

    },
    registerRetailerAdmin : function(req, res){
        console.log(req.body)
//        address:{
//            address:{
//                type: 'string'
//            },
//            street: {
//                type: 'string'
//            },
//            area:{
//                type: 'string'
//            },
//            city:{
//                type: 'string'
//            },
//            State:{
//                type: 'string'
//            },
//            Country:{
//                type: 'string'
//            },
//            Pincode:{
//                type: 'number',
//                    minLength: 6
//            }
//        },
        if(!req.body || !req.body.mobile || !req.body.name || !req.body.address  || !req.body.street || !req.body.area || !req.body.city || !req.body.state || !req.body.country || !req.body.pincode || !req.body.retailerType) {
            res.badRequest('some field(s) missing in request');
        }
        else{
            console.log(req.body);
            Retailer.signUp(req.body, function(err, user){
                if(err)
                    res.serverError(err);
                else{
                    sails.log.debug()
                    res.json(user);
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
        Retailer.listRetailer(req.body, function (err, data) {
            if (err) {
                res.forbidden();
            } else {
                res.json(data);

            }
        });
    },


    getRetailerDetail: function (req, res) {
        var userId = req.param('id');
        if (userId) {
            Retai.userDetail(userId, function (err, data) {
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

