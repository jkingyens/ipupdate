var http = require('http');
var r53 = require('nice-route53');
var url = require('url');

var client = new r53({
    accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

var server = http.createServer(function (req, res) {

  var parsed_url = url.parse(req.url);
  if (parsed_url.path !== '/' + process.env.SECRET_TOKEN) {

    res.statusCode = 403;
    res.write('Invalid token');
    return res.end();

  }
  
  var realIp = req.headers['x-forwarded-for'];
  if (realIp.indexOf('::') !== -1) { 
    realIp = realIp.replace('::ffff:','');
  }

  var args = {
    zoneId : process.env.AWS_ROUTE53_ZONEID,
    name   : process.env.AWS_ROUTE53_RECORD_NAME,
    type   : 'A',
    ttl    : 300,
    values : [ realIp ] 
  };

  client.setRecord(args, function(err, ares) {

    if (err) {

      res.statusCode = 500;
      res.write('Route 53 error!');
      res.end();

    } else {

        res.statusCode = 200;
        res.write(process.env.AWS_ROUTE53_RECORD_NAME + ' now points to ' + realIp, 'utf8');
        res.end();

    }

  });

});

server.listen(3000);
