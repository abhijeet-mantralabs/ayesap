/**
 * RetailerController
 *
 * @description :: Server-side logic for managing retailers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    signUp : function(req, res){
        console.log(req.body);

        if(!req.body || !req.body.email || !req.body.password)
            res.badRequest('Email or password missing in request');
        else{
            console.log(req.body);
            Retailer.signUp(req.body, function(err, user){
                if(err)
                    res.serverError(err);
                else{
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
        Retailer.list(req.body, function (err, data) {
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

