import { DescribeKeyPairsCommand, EC2Client, CreateKeyPairCommand, StartInstancesCommand, StopInstancesCommand, RebootInstancesCommand } from '@aws-sdk/client-ec2';

const ec2Client = new EC2Client({
  credentials: fromIni({profile: 'admin-account'})
});

const describeEc2KeyPairs = async () => {
  try {
    const data = await ec2Client.send(new DescribeKeyPairsCommand({}));
    return data;
  } catch (err) {
    console.log("Error!", err);
  }
};

// create key pair
const params = {
  KeyName: "audible-proxy"
};

const createEc2KeyPair = async () => {
  try {
    const data = await ec2Client.send(new CreateKeyPairCommand(params));
    return data;
  } catch (err) {
    console.log('Error! ', err);
  }
};

// start instance
const startStopParams = {
  InstanceIds: "i-0e56f4f1563c9f83f"
};

const startEc2 = async () => {
  try {
    const data = await ec2Client.send(new StartInstancesCommand(startStopParams));
    return data;
  } catch (err) {
    console.log('Error with Starting EC2! ', err);
  }
};

const stopEc2 = async () => {
  try {
    const data = await ec2Client.send(new StopInstancesCommand(startStopParams));
    return data;
  } catch (err) {
    console.log('Error with Stopping EC2! ', err);
  }
};

const rebootEc2 = async () => {
  try {
    const data = await ec2Client.send(new RebootInstancesCommand(startStopParams));
    return data;
  } catch (err) {
    console.log('Error with Rebooting EC2! ', err);
  }
};


