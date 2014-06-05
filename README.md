ipupdate
========

docker run -p 3000:3000 -e AWS_ACCESS_KEY_ID=XXXXXXX -e AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXX -e SECRET_TOKEN=WebRoute -e AWS_ROUTE53_ZONEID=yourRoute53ZoneID -e AWS_ROUTE53_RECORD_NAME=subdomain.domain.com. jkingyens/ipupdate:latest

This will update your aws route53 zone with a record named subdomain.domain.com and set an A-record with the source ip address:

curl http://localhost:3000/WebRoute

The request should come from the machine which has the ip address you wish to publish.
