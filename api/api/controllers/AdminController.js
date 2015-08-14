/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    registerAdmin: function(req, res){
        if(!req.body || !req.body.name ||  !req.body.email || !req.body.plainPass){
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }else{
            console.log("req body-->>",req.body);
            Admin.adminSignUp(req.body, function(err, admin){
                if(err) {
                    res.status(err.status).json(err);
                }
                else{
                    console.log(admin)
                    res.json({message: "admin registered", details:{ admin: admin}} );
                }
            });
//                }
//            });
        }
    },
    adminLogin: function(req, res){
        if(!req.body || !req.body.email ||  !req.body.password){
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }else{
            Admin.adminLogin(req.body, function(err, admin){
                if(err) {
                    res.status(err.status).json(err);
                }
                else{
                    req.session.adminAuthenticated = true;
                    req.session.admin = admin;
                    delete admin.createdAt;
                    delete admin.updatedAt;
                    delete admin.password;

                    console.log("req session auth admin ", req.session.admin);
                    console.log("admin", admin);
                    res.json({message: "admin logged in successfully", details:{ admin: admin}});
                }
            });
        }
    },
    adminLogout: function(req, res){
        if( req.session.adminAuthenticated == false && req.session.admin == null){
            res.status(400).json({status: 400 , message: "admin already logged out" })
        }else {
            req.session.adminAuthenticated = false;
            req.session.admin =  null;
            res.json({message: "admin logged out successfully"});
        }
    },
    saveConfigByAdmin: function(req, res){

/*--------------->> sample payload  for live -----
      {
          "email": "retailerapp@ayesap.com",
          "key": "089ee14b926fabea6dd95890032d1a37e69c1011c710977af774ec3a7b5b39a6",
          "APIurl" : "http://103.241.183.119/fvapi",
          "riderActiveStatusInUse" : 1,
          "taskAutoAssignOptionInUse": 1,
          "lastTimeCheckms" : 60000,
          "distanceCheckCircleInMeter": 2000,
          "bikerLastTimeCheckms": 900000,
          "configType": "live"
       }
 */

/*--------------->> sample payload  for staging -----
        {
           "email": "abhijeet@mantralabsglobal.com",
           "key": "25b7c81e770034aeda70db74af0fb638beca992d2a535641e6313f38b9665016",
           "APIurl" : "http://103.231.125.120/fvapi",
           "riderActiveStatusInUse" : 1,
           "taskAutoAssignOptionInUse": 1,
           "lastTimeCheckms" : 60000,
           "distanceCheckCircleInMeter": 2000,
           "bikerLastTimeCheckms": 900000,
           "foodCheckCapacity":  0,
           "groceryCheckCapacity":  1,
           "configType" : "backendconfig"
      }
*/
        if(!req.body || !req.body.foodCheckCapacity || !req.body.groceryCheckCapacity || !req.body.configType || !req.body.email || !req.body.key || !req.body.APIurl || !req.body.riderActiveStatusInUse || !req.body.taskAutoAssignOptionInUse || !req.body.lastTimeCheckms || !req.body.bikerLastTimeCheckms || !req.body.distanceCheckCircleInMeter){
            sails.log.debug(req.body);
            res.status(400).json( {status: 400 , message: "some field(s) missing" });

        }else{

            var configType = req.body.configType.toLowerCase().replace(/\s/g, '');

            if(configType == "backendconfig"){
                payload = req.body;
                payload.riderActiveStatusInUse = parseInt(payload.riderActiveStatusInUse);
                payload.taskAutoAssignOptionInUse = parseInt(payload.taskAutoAssignOptionInUse);
                payload.lastTimeCheckms = parseInt(payload.lastTimeCheckms);
                payload.distanceCheckCircleInMeter = parseInt(payload.distanceCheckCircleInMeter);
                payload.bikerLastTimeCheckms = parseInt(payload.bikerLastTimeCheckms);
                payload.foodCheckCapacity = parseInt(payload.foodCheckCapacity);
                payload.groceryCheckCapacity = parseInt(payload.groceryCheckCapacity);

                sails.log.debug(payload);
                Config.saveConfigByAdminDB(req.body, function(err, config){
                    if(err) {
                        res.status(err.status).json(err);
                    }
                    else{
                        console.log(config)
                        res.json({message: "config saved to DB", details:{ config: config}} );
                    }
                });
            }else{
                res.status(400).json( {status: 400 , message: "configType should be backendconfig only"});
            }

        }

    },
    getBackendConfig:function(req, res){
        Config.getConfigByDB(function(err, config){
            if(err){
                sails.log.error("err in fetching config->>>")
                res.status(err.status).json(err);
            }else{
                res.json({message: "saved config fetched", details: { config: config}} );
            }
        })
    },
    getCustomersList: function(req, res){

            Customer.listCustomers( function (err, customers) {
                if (err) {
                    res.status(err.status).json({error: err});
                } else {
                    res.json({ details:{  customersList:  customers}} );
                }
            });

    }




};

