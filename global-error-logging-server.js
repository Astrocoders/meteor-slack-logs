let trackGlobalErrors = function() {
  if (!Meteor.settings.public.slack ||
      !Meteor.settings.public.slack.trackGlobalErrors) {
    return false;
  }

  if (!slackLog) {
    throw new Error('slackLog not defined');
  }

  process.on('uncaughtException', function (error) {
    slackLog.error(`${error.message}, \n${error.stack}`);
    process.exit(1);
  });
};

trackGlobalErrors();
