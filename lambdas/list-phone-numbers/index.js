// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Lambda function to search for available phone numbers in Amazon Connect
 */

const { ConnectClient, SearchAvailablePhoneNumbersCommand } = require('@aws-sdk/client-connect');
const connect = new ConnectClient();

/**
 * Lambda handler to search for available phone numbers
 * @param {Object} event - API Gateway event
 * @returns {Object} HTTP response containing available phone numbers
 */
exports.handler = async (event) => {
    console.log(event);
    
    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    
    let body = {};
    
    /**
     * Request validation
     */
    if (event) {
        try {
            body = JSON.parse(event.body);
        } catch (e) {
            console.log(e);
            
            response.statusCode = 400;
            response.body = "Body is not JSON";
            
            return response;
        }
    } else {
        response.statusCode = 400;
        response.body = "No body in request";
            
        return response;
    }
    
    const params = {
        MaxResults: 5,
        PhoneNumberCountryCode: body.countryCode,
        PhoneNumberType: "DID",
        TargetArn: body.instanceArn
    };
    
    try {
        const command = new SearchAvailablePhoneNumbersCommand(params);
        const results = await connect.send(command);
        
        const data = results.AvailableNumbersList.map(item => item.PhoneNumber);
        response.body = JSON.stringify(data);

    } catch (error) {
        console.error('Error searching phone numbers:', error);
        response.statusCode = 500;
        response.body = JSON.stringify(error);
    }
    
    return response;
};
