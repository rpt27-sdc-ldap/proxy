const S3 = require("@aws-sdk/client-s3");

const REGION = 'us-west-2';

const {fromIni} = require("@aws-sdk/credential-provider-ini");
const s3Client = new S3.S3Client({
  credentials: fromIni({profile: 'admin-account'})
});

module.exports = s3Client;