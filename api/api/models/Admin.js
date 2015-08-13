/**
* Admin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var crypto = require('crypto');

module.exports = {

  attributes: {
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
      password: {
          type: 'string'
      }
  },
    adminSignUp:function(opts,cb){
        sails.log.debug("admin opts in db function ----  >> ", opts);
        Retailer.findOne({email:opts.email}).exec(function(err, admin){
            if(err){
                cb(err);
            }else if(!admin){
                var admin = {
                    name: opts.name,
                    email: opts.email
                };
                saltAndHash(opts.plainPass ,function(hash) {
                    admin.password = hash;
                    console.log(admin)
                    Admin.create(admin, function(err, admin){
                        if(err){
                            cb(err);
                        }else{
                            cb(null,admin);
                        }
                    });
                })
            }else if(admin){
                cb({status: 400 , message: "admin Already exists with this email" }, null);
            }
        });
  },
  adminLogin: function(opts, cb){
      Admin.findOne({email:opts.email}).exec(function(err, admin){
          if(err)
              cb(err);
          else if(admin){
              validatePassword(opts.password,admin.password,function(res){
                  if(res){
                      cb(null,admin);
                  }
                  else{
                      cb({status: 401 , message: "wrong credentials" }, null);
                  }
              });
          }
          else{
              cb({status: 401 , message: "admin does not exist with this email" }, null);
          }
      });
  }
};

var generateSalt = function(passLength){
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < passLength; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
    var salt = generateSalt(10);
    callback(salt + md5(pass + salt));
}



var validatePassword = function(plainPass, hashedPass, callback){
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);
    callback(hashedPass === validHash);
}