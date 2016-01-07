let trackGlobalErrors = function() {
  if (!Meteor.settings.public.slack ||
      !Meteor.settings.public.slack.isProd ||
      !Meteor.settings.public.slack.trackGlobalErrors) {
    return false;
  }

  if (!slackLog) {
    throw new Error('slackLog not defined');
  }

  window.addEventListener('error', function(error) {
    slackLog.error(`${error.message}, \n${error.filename}: ${error.lineno}`);
  });

  /**
   * Borrowed the idea of hijack Meteor._debug from kadira
   * https://github.com/meteorhacks/kadira/blob/59b1b27035ad4a2ad5a911fad37ec8eb8b7aed40/lib/hijack/error.js
   */
  let originalMeteorDebug = Meteor._debug;
  Meteor._debug = function (message, stack) {
    slackLog.error(`${message}, \n${stack}`, 'server');
    return originalMeteorDebug.apply(this, arguments);
  };
};

Meteor.startup(function () {
  trackGlobalErrors();
});
