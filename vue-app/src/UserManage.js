/**
 * User Class represents logic for user management
 * for the application
 *
 * @Author Christopher Hill
 */
 export default class UserManage {

    #mCognito;
    #mUserPoolConfig;
  
    /**
     * @param {AmazonCognitoIdentity} cognito
     * @param {Object} userPoolConfig
     * @param {String} userPoolConfig.UserPoolId
     * @param {String} userPoolConfig.ClientId
     */
    constructor(cognito, userPoolConfig) {
      this.#mCognito = cognito;
      this.#mUserPoolConfig = userPoolConfig;
    }
  
    /**
     * @param {Object} userPoolConfig
     * @param {String} userPoolConfig.UserPoolId
     * @param {String} userPoolConfig.ClientId
     */
    static async factory(userPoolConfig) {
      const module = await import("amazon-cognito-identity-js");
      return new UserManage(module, userPoolConfig);
    }
  
    userPool() {
      return new this.#mCognito.CognitoUserPool(this.#mUserPoolConfig);
    }
  
    /**
     * @param {String} username
     * @param {String} password
     * @returns Promise
     */
    login(username, password) {
      return new Promise((resolve, reject) => {
        const authenticationDetails = new this.#mCognito.AuthenticationDetails({
          Username: username,
          Password: password,
        });
  
        const cognitoUser = new this.#mCognito.CognitoUser({
          Username: username,
          Pool: this.userPool(),
        });
  
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            resolve(result);
          },
          onFailure: function(err) {
            reject(err);
          },
        });
      });
    }
  
    /**
     * If you are logged in, this will return
     * a cognito user. 
     * 
     * @returns {CognitoUser}
     */
    currentUser() {
      return this.userPool().getCurrentUser();
    }
  
    /**
     * Returns an array of user attributes 
     * 
     * @returns {Array}
     */
    userAttributes(){
      return new Promise((resolve,reject)=> {
        const user = this.currentUser();
        user.getSession(function(err) {
          if (err) {
              reject(err);
              return;
          }
          user.getUserAttributes((err,result)=> {
            if(err){
              return reject(err);
            }
            return resolve(result.reduce((attrs,attr) => {
              attrs[ attr.getName() ] = attr.getValue();
              return attrs;
            },{}));
          });
  
        });
      });
    }
  
    /**
     * If you are logged in, this will log you out.
     */
    logout() {
      return new Promise((success) => {
        const cognitoUser = this.userPool().getCurrentUser();
        if (cognitoUser !== null) {
          cognitoUser.signOut();
        }
        success();
      });
    }
  
    /**
     * Register a new user
     *
     * @param {Object} userData
     * @param {String} userData.userNameFieldName - This value will be used like userData[ value ] to accomodate either email or usernames
     * @param {String} userData.password
     * @param {String} userData.* - Any other fields will be added as attributes
     */
    register(userData) {
      return new Promise((resolve, reject) => {
  
        if (!userData.userNameFieldName)
          reject("userNameFieldName is a required parameter");
  
        if (!userData.password) reject("password is a required parameter");
  
        const uname = userData[userData.userNameFieldName];
        const password = userData.password;
        delete userData.password;
        delete userData.userNameFieldName;
  
        const attributeList = Object.keys(userData).map((key) => {
          return new this.#mCognito.CognitoUserAttribute({
            Name: key,
            Value: userData[key],
          });
        });
  
        this.userPool().signUp(
          uname,
          password,
          attributeList,
          null,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }
  }