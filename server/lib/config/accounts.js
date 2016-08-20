Meteor.startup(function() {

  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
      }
    },
    { upsert: true }
  );
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
});
