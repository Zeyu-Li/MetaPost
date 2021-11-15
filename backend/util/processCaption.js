'use strict';

// NOTE: Don't remove the unused modules
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

// Link for documentation
// https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library?pivots=programming-language-javascript&tabs=visual-studio

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */

const genCaptionImage = async (AZURE_API_KEY, imagePath) => {
    const key = AZURE_API_KEY;
    const endpoint = 'https://cycc-image-process.cognitiveservices.azure.com/';
    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
    const describeImagePath = imagePath;
    // DescribeImageInStream takes a function that returns a ReadableStream, NOT just a ReadableStream instance.
    const captionLocal = (await computerVisionClient.describeImageInStream(
        () => createReadStream(describeImagePath))).captions[0];
    // console.log(`This may be ${captionLocal.text}`);
    // return Promise.resolve(captionLocal.text);
    return captionLocal.text;
}





module.exports =  {
    genCaptionImage
}