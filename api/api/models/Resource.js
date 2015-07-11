/**
* Resource.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true,
            minLength: 3
        },
        mobile: {
            type: 'integer',
            required: true,
            minLength: 10,
            unique: true
        },
        city:{
            type: 'string'
        }
    },
    requestResSignUp:function(opts,cb){
        sails.log.debug("opts in db function ----  >> ", opts);

        Resource.create(opts, function(err, user){
            if(err){
                cb(err);
            }else{
                cb(null,user);
            }
        });
    },
    listResources: function (req, cb) {
        Resource.find().exec(function(err, resources){
            if(err){
                cb(err);
            }else if(resources){
                cb(null, resources);
            }
        });
    }
};

