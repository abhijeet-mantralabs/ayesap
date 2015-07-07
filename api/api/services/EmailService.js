//var nodemailer = require('nodemailer');
//var sgTransport = require('nodemailer-sendgrid-transport');
//var hbs = require('nodemailer-express-handlebars');
//
//var transporter = nodemailer.createTransport({
//    service: 'Gmail',
//    auth: {
//        user: "ayesap.test@gmail.com",
//        pass: "ayesap123"
//    }
//});
//
//// NB! No need to recreate the transporter object. You can use
//// the same transporter object for all e-mails
//
//exports.sendMailForPass = function(data, cb){
//    // setup e-mail data with unicode symbols
//    var mailOptions = {
////        from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
//        to: data.email, // list of receivers
//        subject: 'Ayesap Authentication Details', // Subject line
//        template: data.template || 'signup',
//        context: data
//    };
//
//    transporter.sendMail(mailOptions, function(err, res){
//        if (err) {
//            console.log(err)
//        }else{
//            console.log(res);
//        }
//    });
//}



//
//
//
//// send mail with defined transport object
//transporter.sendMail(mailOptions, function(error, info){
//    if(error){
//        return console.log(error);
//    }
//    console.log('Message sent: ' + info.response);
//
//});



//var options = {
//    auth: {
//        api_user: 'Anurag',
//        api_key: 'Ayesap##1@2'
//    }
//}
//
//var transporter = nodemailer.createTransport(sgTransport(options));
//transporter.use('compile', hbs({viewEngine: 'ejs', viewPath: 'views/email', extName: '.ejs'}));
//
//exports.send = function(data, cb) {
//    var mail = {
//        from: 'PropGod <noreply@propgod.com>',
//        to: data.to,
//        subject: data.subject,
//        template: data.template || 'signup',
//        context: data
//    }
//
//    transporter.sendMail(mail, function(err, res){
//        if (err) {
//            console.log(err)
//        }else{
//            console.log(res);
//        }
//    });
//
//}