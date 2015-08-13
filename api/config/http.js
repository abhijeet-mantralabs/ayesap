/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/


  middleware: {


  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
       'startRequestTimer',
       'cookieParser',
       'session',
//       'myRequestLogger',
       'myConfigLoader',
       'bodyParser',
       'handleBodyParserError',
       'compress',
       'methodOverride',
       'poweredBy',
       '$custom',
       'router',
       'www',
       'favicon',
       '404',
       '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }

  myConfigLoader: function(req, res, next){
      Config.find().exec(function(err, configs){
          if(!err){
              console.log("http middleware config --->>",configs);
//                req.session.config = configs[0];
//              req.session.config.riderActiveStatusInUse
              if(configs.length > 0){
                    req.session.config = {
                        email: configs[0].email,
                        key: configs[0].key,
                        riderActiveStatusInUse : configs[0].riderActiveStatusInUse,
                        taskAutoAssignOptionInUse: configs[0].taskAutoAssignOptionInUse,
                        lastTimeCheckms : configs[0].lastTimeCheckms,
                        distanceCheckCircleInMeter: configs[0].distanceCheckCircleInMeter,
                        bikerLastTimeCheckms: configs[0].bikerLastTimeCheckms,
                        APIurl: configs[0].APIurl,
                        configType : configs[0].configType
                    };
                    console.log("http middleware req session config --->>",req.session.config)
                }else{
                    req.session.config = {
                        email: sails.config.globals.partnerDetails.email,
                        key: sails.config.globals.partnerDetails.key,
                        riderActiveStatusInUse : sails.config.globals.riderActiveStatusInUse,
                        taskAutoAssignOptionInUse: sails.config.globals.taskAutoAssignOptionInUse,
                        lastTimeCheckms : sails.config.globals.lastTimeCheckms,
                        distanceCheckCircleInMeter: sails.config.globals.distanceCheckCircleInMeter,
                        bikerLastTimeCheckms: sails.config.globals.bikerLastTimeCheckms,
                        APIurl: sails.config.globals.APIurl,
                        configType : "backendconfig"
                    };
                }

//              {
//                  "email": "abhijeet@mantralabsglobal.com",
//                  "key": "25b7c81e770034aeda70db74af0fb638beca992d2a535641e6313f38b9665016",
//                  "APIurl" : "http://103.241.183.119/fvapi",
//                  "riderActiveStatusInUse" : 1,
//                  "taskAutoAssignOptionInUse": 1,
//                  "lastTimeCheckms" : 60000,
//                  "distanceCheckCircleInMeter": 2000,
//                  "bikerLastTimeCheckms": 900000,
//                  "configType" : "backendconfig"
//              }

          }else{
              req.session.config = {
                  email: sails.config.globals.partnerDetails.email,
                  key: sails.config.globals.partnerDetails.key,
                  riderActiveStatusInUse : sails.config.globals.riderActiveStatusInUse,
                  taskAutoAssignOptionInUse: sails.config.globals.taskAutoAssignOptionInUse,
                  lastTimeCheckms : sails.config.globals.lastTimeCheckms,
                  distanceCheckCircleInMeter: sails.config.globals.distanceCheckCircleInMeter,
                  bikerLastTimeCheckms: sails.config.globals.bikerLastTimeCheckms,
                  APIurl: sails.config.globals.APIurl,
                  configType : "backendconfig"
              };

          }

      });
      return next();
  }



  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  }

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
