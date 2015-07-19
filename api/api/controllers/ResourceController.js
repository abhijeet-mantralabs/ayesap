/**
 * ResourceController
 *
 * @description :: Server-side logic for managing resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');
module.exports = {
    fetchNearResources : function(req, res){
       console.log(req.body)
    },
    reqForResRegister: function(req, res){
        if(!req.body || !req.body.mobile ||  !req.body.name){
            res.status(400).json( {status: 400 , message: "some field(s) missing" });
        }else{
            console.log(req.body);
            Resource.requestResSignUp(req.body, function(err, user){
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
    getResourceList: function (req, res) {
        Resource.listResources(req.body, function (err, resources) {
            if (err) {
                res.status(err.status).json({error: err});
            } else {
                res.json({ details:{ resourceList: resources}} );
            }
        });
    },
    getRiderByZone: function(req, res){
        zone = sails.config.globals.listOfZones[0];

        ResourceService.getRidersInZone(7 ,zone,function(err, response) {
            if (err) {
                console.log("error in controller", err)
                res.status(err.status).json(error);
            } else {
                console.log("response in controller", response)
                res.json({message: "riders fetched", details: response});
            }
        })
    }
};

