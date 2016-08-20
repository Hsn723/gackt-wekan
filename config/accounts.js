// Only allow festivaljapon logins
Accounts.config({ restrictCreationByEmailDomain: 'festivaljapon.com'});

Accounts.onCreateUser((options, user) => {
  if (! user.services.google) {
    throw new Error('Expected login with Google only.');
  }
  const { picture, email, name } = user.services.google;
  user.profile.fullname = name;
  user.profile.emailBuffer = [email];
  user.profile.avatarUrl = picture;
  user.username = email;

  //const { first_name, last_name } = user.services.facebook;
  //user.initials = first_name[0].toUpperCase() + last_name[0].toUpperCase();

  // Don't forget to return the new user object at the end!
  return user;
});

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

AccountsTemplates.configure({
  texts: {
    errors: {
      mustBeLoggedIn: "Please login with your Matsuri account."
    }
  }
});

//AccountsTemplates.removeField('lang');
