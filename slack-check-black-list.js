/**
 * Check if there is a loop, don't send the message more then once
 * @param {String} message
 */
slackLog.checkBlackList = function(message) {
  let slackConfig = Meteor.settings.public.slack;
  let blackList = slackConfig.blackList;

  return _.some(blackList, (string) => regexCheckBlackList(string, message));
};

function regexCheckBlackList (string, message) {
  let stringRegExp = new RegExp(string, 'gi');

  return message.match(stringRegExp);
}