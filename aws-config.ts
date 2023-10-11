const AWS_CONFIG = {
    aws_project_region: process.env.AWS_REGION,
    Auth: {
        mandatorySignIn: true,
        region: process.env.AWS_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    },
};

export default AWS_CONFIG;
