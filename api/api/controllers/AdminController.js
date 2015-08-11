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
    }

};

