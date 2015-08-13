/**
* Config.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  },
  saveConfigByAdminDB: function(opts, cb){
// should be      "configType" : "backendconfig"
      Config.findOne({configType : opts.configType}).exec(function(err, config){
          if(err){
              cb(err);
          }else if(!config){
              sails.log.debug("config created----->>")
              Config.create(opts, function(err, savedConfig){
                  if(err){
                      sails.log.debug("err in saving config in db----- >>  ")
                      cb(err);
                  }else{
                      sails.log.debug("config saved in db----- >>  ")
                      cb(null,savedConfig);
                  }
              });
          }else if(config){
              sails.log.debug("config updated----->>")
              Config.update({configType : opts.configType}, opts ,  function (err, updatedConfig) {
                  if (!err){
                      cb(null, updatedConfig[0]);
                  }else{
                      cb(err);
                  }
              });
          }
      });
  },
  getConfigByDB: function(cb){
     Config.find(function(err, savedConfig){
        if(err){
              cb(err);
        }else{
          cb(null,savedConfig);
        }
     });

  }
};

