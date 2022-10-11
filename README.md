# Experience Builder for Amazon Connect

This project allows users to design and deploy customer experiences in their Amazon Connect instances using a wizard  interface.

**Note:** This project currently offers to build customer experiences for Australia and New Zealand. More locations to be added on request. 

## Architecture

![Architecture](/img/Architecture-ExperienceBuilder.png)

The solution deploys the required resources and operates following this pattern:
1. Amazon S3 stores and serves the frontend static content through Amazon Cloudfront
2. The frontend sends requests to AWS API Gateway through Amazon Cloudfront
3. AWS Lambda functions receive the requests from Amazon API Gateway, and process the business logic
4. AWS Step Function state machine is started through AWS Lambda
5. Resources are created in your Amazon Connect instance

## Deployment

Deployment of the solution is performed through AWS Cloudformation. To deploy the solution, follow these steps:

1. Download the deployment [archive](/deployment/deployment.zip) to your computer and decompress it.
2. Upload the files contained within the archive to a S3 bucket of your choice
3. In the AWS Console, navigate to Cloudformation and create a new stack
4. Create the new stack using the *cloudformation.yaml* file provided
5. Only 2 parameters are required: your email address and the name of the S3 bucket where the deployment files are located
6. Navigate to the **Outputs** tab to retrieve the frontend URL and your personal API key

**Note:** The API key will act as a password for authorized users to access Experience Builder for Amazon Connect. DO NOT communicate this key to unauthorized users.

**Note:** Experience Builder for Amazon Connect is currently tailored for those customers located in Australia and New Zealand, with more countries to be added in the future. 

## Usage

### API Key

When you access Experience Builder for Amazon Connect, you will be prompted for the API key obtained when you deployed the solution.

When prompted, enter the API key and click **Submit**. If the key is valid, you can access Experience Builder for Amazon, and start building your desired customer experience.

![API Key](/img/api_key.png)

### Experience definition

Follow the wizard to define the customer experience you want to deploy, including the following features.

#### Experience Name

![Experience Name](/img/experience_name.png)

This name will be used to identify the resources created in your Amazon Connect instance. No special characters allowed.

#### Features

![Features](/img/features.png)

Use the checkboxes to enable call recording, as well as speech analytics (postcall or realtime) for this experience.

#### Voice

![Voice](/img/voice.png)

Select the :link[Amazon Polly](https://aws.amazon.com/polly/) voice that will be used to play text-to-speech prompts in your experience.

**Note:** Experience Builder for Amazon Connect currently supports 2 voices, Olivia (English - Australia) and Aria (English - New Zealand). Both are neural text-to-speech voices and will provide high-quality prompt delivery for your customers.

#### Greeting

![Greeting](/img/greeting.png)

The message that will be used to greet your customers when they call.

#### Hours of operation

![HOP](/img/hop.png)

You can choose to only allow inbound calls to your experience during specified operating hours. Use the dropdown to select the timezone, and define your operating hours for each day of the week.

**Note:** Experience Builder for Amazon Connect currently supports all Australia and New Zealand timezones.

#### Customer Journey

![Journey](/img/journey.png)

Use this section to define how you want to direct your calls, during and outside operating hours.
1. With a DTMF menu:
Use the menu creator to define a prompt and the allowed options. For each option, you can choose to direct the call to a queue, play a message and hang up, or transfer to an external number.
2. Transfer to queue: 
Callers will be directed to a queue, without a menu. Enter a queue name for calls to be directed to.

If you have defined hours of operation, type in the messgae you want callers to hear when they dial outside of hours.

**Note:** Queue names are free-from text. You can name the queue accordingly to your needs and these will be created for you in your Amazon Connect instance. Only alphanumeric characters are permitted.
**Note:** Experience Builder for Amazon Connect currently supports transferring calls to external numbers in Australia and New Zealand.

### Instance and phone number selection, resources summary

Once the experience is defined, you can choose the Amazon Connect instance in which to create it. The choices available are the Amazon Connect instances that exists in your account, for the region in which Experience Builder has been deployed.

Use the selection to choose the Amazon Connect instance you want to use for this experience. 

![instances](/img/instances.png)

After selecting the instance, you can select the phone number to associate with the experience. Experience Builder for Amazon Connect will claim the number in the instance selected, and associate the experience to it.

![numbers](/img/numbers.png)

A resource summary will show the resources that will be created in your Amazon Connect instance.

![resources](/img/resources.png)

**Note:** Experience Builder for Amazon Connect will create additional resources that are required for your experience, such as contact flows. All the resources created will be identifiable through the name given to the experience.

After clicking on **Confirm**, Experience Builder for Amazon Connect will create the necessary resources (queues, contact flows, hours of operation and phone number). Once the creation is complete, you can dial the phone number, test your experience, and start using this experience with your customers.

**Note:** You will still need to create users in Amazon Connect for your agents to log in and take calls. Don't forget to review the Routing Profiles and add the queues created by Experience Builder to the relevant profiles.

## License

This solution is licensed under the MIT-0 License.

## Release notes

See the CHANGELOG.
