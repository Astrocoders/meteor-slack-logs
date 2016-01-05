let trackGlobalErrors = function() {
  if (!Meteor.settings.public.slack ||
      !Meteor.settings.public.slack.trackGlobalErrors) {
    return false;
  }

  if (!slackLog) {
    throw new Error('slackLog not defined');
  }

  window.addEventListener('error', function(error) {
    slackLog.error(`${error.message}, \n${error.filename}: ${error.lineno}`);
  });
};

trackGlobalErrors();
