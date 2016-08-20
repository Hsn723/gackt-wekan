Template.headerUserBar.events({
  'click .js-open-header-member-menu': Popup.open('memberMenu'),
  'click .js-change-avatar': Popup.open('changeAvatar'),
});

Template.memberMenuPopup.events({
  'click .js-edit-profile': Popup.open('editProfile'),
  'click .js-change-avatar': Popup.open('changeAvatar'),
  'click .js-edit-notification': Popup.open('editNotification'),
  'click .js-logout'(evt) {
    evt.preventDefault();

    AccountsTemplates.logout();
  },
});

Template.editProfilePopup.events({
  submit(evt, tpl) {
    evt.preventDefault();
    const fullname = tpl.find('.js-profile-fullname').value.trim();
    const username = tpl.find('.js-profile-username').value.trim();
    const initials = tpl.find('.js-profile-initials').value.trim();
    Users.update(Meteor.userId(), {$set: {
      'profile.fullname': fullname,
      'profile.initials': initials,
    }});
    // XXX We should report the error to the user.
    if (username !== Meteor.user().username) {
      Meteor.call('setUsername', username);
    }
    Popup.back();
  },
});

Template.editNotificationPopup.helpers({
  hasTag(tag) {
    const user = Meteor.user();
    return user && user.hasTag(tag);
  },
});

// we defined github like rules, see: https://github.com/settings/notifications
Template.editNotificationPopup.events({
  'click .js-toggle-tag-notify-participate'() {
    const user = Meteor.user();
    if (user) user.toggleTag('notify-participate');
  },
  'click .js-toggle-tag-notify-watch'() {
    const user = Meteor.user();
    if (user) user.toggleTag('notify-watch');
  },
});
