const express = require('express');
const aws = require('aws-sdk')
const crypto = require('crypto')
const dotenv = require('dotenv')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = process.env.REACT_APP_AWS_BUCKET_REGION
const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})


const generateUploadURL = async () => {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

module.exports = generateUploadURL
