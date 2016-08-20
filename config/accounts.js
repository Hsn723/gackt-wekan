/*const passwordField = AccountsTemplates.removeField('password');
const emailField = AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
  _id: 'username',
  type: 'text',
  displayName: 'username',
  required: true,
  minLength: 2,
}, emailField, passwordField]);*/

// Only allow festivaljapon logins
Accounts.config({ restrictCreationByEmailDomain: 'festivaljapon.com'});
AccountsTemplates.configure({
  defaultLayout: 'userFormsLayout',
  defaultContentRegion: 'content',
  confirmPassword: false,
  enablePasswordChange: false,
  sendVerificationEmail: false,
  showForgotPasswordLink: false,
  forbidClientAccountCreation: true,
  onLogoutHook() {
    const homePage = 'home';
    if (FlowRouter.getRouteName() === homePage) {
      FlowRouter.reload();
    } else {
      FlowRouter.go(homePage);
    }
  }
});

['signIn'].forEach(
  (routeName) => AccountsTemplates.configureRoute(routeName));
