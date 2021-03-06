/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.globals.html
 */
module.exports.globals = {



  /****************************************************************************
  *                                                                           *
  * Expose the lodash installed in Sails core as a global variable. If this   *
  * is disabled, like any other node module you can always run npm install    *
  * lodash --save, then var _ = require('lodash') at the top of any file.     *
  *                                                                           *
  ****************************************************************************/

	// _: true,

  /****************************************************************************
  *                                                                           *
  * Expose the async installed in Sails core as a global variable. If this is *
  * disabled, like any other node module you can always run npm install async *
  * --save, then var async = require('async') at the top of any file.         *
  *                                                                           *
  ****************************************************************************/

	// async: true,

  /****************************************************************************
  *                                                                           *
  * Expose the sails instance representing your app. If this is disabled, you *
  * can still get access via req._sails.                                      *
  *                                                                           *
  ****************************************************************************/

	// sails: true,

  /****************************************************************************
  *                                                                           *
  * Expose each of your app's services as global variables (using their       *
  * "globalId"). E.g. a service defined in api/models/NaturalLanguage.js      *
  * would have a globalId of NaturalLanguage by default. If this is disabled, *
  * you can still access your services via sails.services.*                   *
  *                                                                           *
  ****************************************************************************/

	// services: true,

  /****************************************************************************
  *                                                                           *
  * Expose each of your app's models as global variables (using their         *
  * "globalId"). E.g. a model defined in api/models/User.js would have a      *
  * globalId of User by default. If this is disabled, you can still access    *
  * your models via sails.models.*.                                           *
  *                                                                           *
  ****************************************************************************/

	// models: true

//  partnerDetails: {
//    email: "abhijeet@mantralabsglobal.com",
//    key: "25b7c81e770034aeda70db74af0fb638beca992d2a535641e6313f38b9665016"
//  },
//   partnerDetails: {
//    email: "anurag.khemka@iiml.org",
//    key: "0fbc9039145b6449a7765dcc00d3bd8377d93ac8cccda9f0292b5976e6d67c75"
//  },
    partnerDetails: {
        email: "retailerapp@ayesap.com",
        key: "089ee14b926fabea6dd95890032d1a37e69c1011c710977af774ec3a7b5b39a6"
    },

  APIurl : "http://103.241.183.119/fvapi",
  listOfZones: [9],
  taskStatusDesc : {
      "10001" : "Pending",
      "10002" : "Completed",
      "10003" : "Failed",
      "10004" : "Rescheduled",
      "10005" : "Pending Approval"
  },
    riderActiveStatusInUse : 1,
    taskAutoAssignOptionInUse: 1

//  riderActiveStatus: {
//    active: 0,   //<<-- default
//    checkedIn: 1
//  },
//  taskAutoAssignOption:{
//    autoAssign: 1,  <<----- when pushed in live to check for real time testing
//    doNotAutoAssign: 0
//  }
};
