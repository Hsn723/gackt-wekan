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

});
