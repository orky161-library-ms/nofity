const AWS = require('aws-sdk');

function sendEmail ({email, msg}){

    const params = {
        Destination: {
            ToAddresses: ["orky161@gmail.com"]
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
        Source: 'orky161@gmail.com',
    };
    const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    return sendPromise
}

module.exports ={
    sendEmail
}
