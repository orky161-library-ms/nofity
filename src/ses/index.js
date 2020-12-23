const AWS = require('aws-sdk');

function sendEmail (email, msg){
    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: msg
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Library.io'
            }
        },
        Source: 'library@io.com',
    };
    const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    sendPromise.then((data) => {
            console.log(data.MessageId);
        }).catch((err) => {
            console.error(err, err.stack);
        });
}

module.exports ={
    sendEmail
}
