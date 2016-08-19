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
  /*onLogoutHook() {
    const homePage = 'home';
    if (FlowRouter.getRouteName() === homePage) {
      FlowRouter.reload();
    } else {
      FlowRouter.go(homePage);
    }
  },*/
});

/*['signIn', 'signUp', 'enrollAccount'].forEach(
  (routeName) => AccountsTemplates.configureRoute(routeName));


if (Meteor.isServer) {
  if (process.env.MAIL_FROM) {
    Accounts.emailTemplates.from = process.env.MAIL_FROM;
  }

  ['enrollAccount-subject', 'enrollAccount-text'].forEach((str) => {
    const [templateName, field] = str.split('-');
    Accounts.emailTemplates[templateName][field] = (user, url) => {
      return TAPi18n.__(`email-${str}`, {
        url,
        user: user.getName(),
        siteName: Accounts.emailTemplates.siteName,
      }, user.getLanguage());
    };
  });
}*/
