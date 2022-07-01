import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';

var poolData = {
	UserPoolId: process.env.REACT_APP_USER_POOL_ID, // Your user pool id here
	ClientId: process.env.REACT_APP_CLIENT_ID // Your client id here
};

class CognitoClient {
    constructor() {
        this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    }

    async authenticateUser(username, password) {
        console.log("authenticating the user")
        var authenticationData = {
            Username: username,
            Password: password,
        };

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
        );

        console.log(`Authentication details: ${JSON.stringify(authenticationDetails)}`)

        var userData = {
            Username: username,
            Pool: this.userPool,
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        console.log("calling authenticate User: " + JSON.stringify(cognitoUser))
        cognitoUser.authenticateUser(authenticationDetails, {onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log("AccessToken: " + accessToken)
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-east-1';
    
            console.log("getting cognito identity credentials")
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:91224994-a205-42f6-93de-0cb9d4070ae0', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_O4I0wipo6': result
                        .getIdToken()
                        .getJwtToken(),
                },
            });
    
            console.log("Credential refresh")
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh(error => {
                if (error) {
                    console.error(error);
                } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    console.log('Successfully logged!');
                }
            });
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
        });
    }

    async signin(username, password, callback) {
        this.authenticateUser(username, password)
    }

    async signup(username, password, callback) {
        let value = await this.userPool.signUp(username, password, null, null, (err, result) => {
            if (err) {
                console.log("Error: " + JSON.stringify(err))
                alert("Unable to create account: " + JSON.stringify(err))
            } else {
                var cognitoUser = result.user;
                console.log("User: " + JSON.stringify(cognitoUser))
                this.authenticateUser(username, password)
                // callback()
            }
        }) 
    }
}

const cognitoClient = new CognitoClient() 
Object.freeze(cognitoClient)
export default cognitoClient