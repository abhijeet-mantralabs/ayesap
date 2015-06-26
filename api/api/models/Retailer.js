/**
 * Retailer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var crypto = require('crypto');
module.exports = {
    attributes: {
        retailerId:{
            type: 'string',
            unique: true,
            required: true
        },
        name: {
            type: 'string',
            required: true,
            minLength: 3
        },
        email: {
            type: 'email',
            minLength: 5,
            unique: true
        },
        mobile: {
            type: 'integer',
            required: true,
            minLength: 10,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            defaultsTo:"12345678"
        },
        address:{
            type: 'string'
        },
        street: {
            type: 'string'
        },
        area:{
            type: 'string'
        },
        city:{
            type: 'string'
        },
        state:{
            type: 'string'
        },
        country:{
            type: 'string'
        },
        pincode:{
            type: 'integer',
            minLength: 6,
            maxLength: 6
        },
        retailerType:{
            type: 'string'
        },
        registrationStatus:{
            type: 'string',
            enum: ['pending', 'approved', 'denied','notRegistered'],
            defaultsTo: 'notRegistered'
        },
        location:{
            latitude: {
                type: 'string'
            },
            longitude: {
                type: 'string'
            }
        }
    },
    requestSignUp:function(opts,cb){
        sails.log.debug("opts in db function ----  >> ", opts);
        Retailer.findOne({mobile:opts.mobile}).exec(function(err, user){
            if(err){
                cb(err);
            }else if(!user){
                Retailer.create(opts, function(err, user){
                    if(err){
                         cb(err);
                    }else{
                         cb(null,user);
                    }
                });
            }else if(user){
                cb({status: 400 , message: "Retailer Already exists with this mobile no." }, null);
            }
        });
    },
    signUp : function(opts,cb){
        Retailer.findOne({retailerId:opts.retailerId, mobile:opts.mobile}).exec(function(err, retailer){
            if(err){
                cb(err);
            }else if(retailer){
                sails.log.debug("in if retailer");
                saltAndHash(generatePassword(retailer),function(hash) {
                    sails.log.debug("in salt hash retailer"+hash);
//                    opts.password = hash;
                    //retailerId: opts.retailerId, mobile: opts.mobile
                    opts.password = generatePassword(retailer);
//                    opts.password = hash;
                    opts.registrationStatus = "approved";
                    Retailer.update({retailerId: opts.retailerId, mobile: opts.mobile}, opts ,  function (err, retailerUpdated) {
                        if (!err){
                            cb(null, retailerUpdated[0]);
                        }else{
                            cb(err);
                        }
                    });
                })
            }else if(!retailer){
                cb({status: 400 , message: "No user found with matching retailerID and mobile no." }, null);
            }
        });
    },
    login : function(opts, cb){
        Retailer.findOne({where:{email:opts.email}}).exec(function(err, user){
            if(err)
                cb(err);
            else if(user){
                validatePassword(opts.password,user.password,function(res){
                    if(res){
                        delete user['password'];
                        cb(null,user);
                    }
                    else{
                        cb("Email or password does not match");
                    }
                });
            }
            else{
                cb("user does not exist");
            }
        });
    },
    listRetailers: function (req, cb) {
        Retailer.find().exec(function(err, retailers){
            if(err){
                cb(err);
            }else if(retailers){
                cb(null, retailers);
            }
        });
    },

    userDetail: function (uid, callback) {
        Retailer.find({userId: uid}).exec(function (err, data) {
            if (!err) {
                if (data.length == 0) {

                    callback(null, {errorType: "User Details", errorMessage: "No User with this ID"});

                } else {

                    callback(null, data);
                }
            } else {
                return callback(err, {"status": "failed"});
            }
        });
    }
};

var generateSalt = function(){
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
    var salt = generateSalt();
    callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback){
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(hashedPass === validHash);
}

var generatePassword = function(retailer){
    var pwd = retailer.id.slice(retailer.id.length - 6, retailer.id.length);
    return pwd;
}