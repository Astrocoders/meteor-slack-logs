/**
 * Check if there is a loop, don't send the message more then once
 * @param {String} message
 */
slackLog.checkLoop = function(message) {
  if (slackLog.checkMessage === message) {
    return true;
  } else {
    slackLog.checkMessage = message;
  }
};