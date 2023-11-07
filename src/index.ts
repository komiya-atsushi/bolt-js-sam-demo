import {App, AwsLambdaReceiver} from '@slack/bolt';
import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET ?? '',
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.message(async ({message, say}) => {
  // Workaround for https://github.com/slackapi/bolt-js/issues/904
  if (message.subtype) {
    return;
  }

  await say(message.text ?? '');
});

// Handle the Lambda function event
export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  const awsHandler = await awsLambdaReceiver.start();
  return awsHandler(event, context, callback);
};
