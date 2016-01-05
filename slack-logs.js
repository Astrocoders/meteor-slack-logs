let sendSlack = function(message, type) {
  /**
   * Slack configuration on Meteor.settings
   */
  let slackConfig = Meteor.settings.public.slack;

  if (!slackConfig) {
    throw new Error('SlackLog: required publick slack settings');
  }

  /**
   * Check if all required slack information is not misssed
   */

  check(slackConfig, {
    webhook: String,
    botUsername: String,
    iconUrl: String,
    channel: String,
    appName: String,
    appUrl: String,
  });

  /**
   * Slack link to send POST payload
   * @type {String}
   */
  let webhookLink = slackConfig.webhook;

  /**
   * Bot username to be shown on slack message
   * @type {String}
   */
  let username = slackConfig.botUsername;

  /**
   * Icon URL to be shown on slack message
   * @type {String}
   */
  let icon_url = slackConfig.iconUrl;

  /**
   * Override channel to be shown on slack message
   * @type {String}
   */
  let channel = slackConfig.channel;

  /**
   * Name of the application to be shown on slack message
   * @type {String}
   */
  let appName = slackConfig.appName;

  /**
   * URL to access the application via slack message
   * @type {String}
   */
  let appUrl = slackConfig.appUrl;


  let createAttachment = (text, type, scope) => {
    let color = {
      error: '#c43b31',
      message: '#fafafa',
      success: '#39c343',
    };

    let attachments = [
      {
        'fallback': `${appName} - ${text}`,
        'text': `<${appUrl}|${appName}> - \n ${text}`,
        'fields': [
          {
            'title': 'Type',
            'value': `${type}`,
            'short': true
          },
          {
              'title': 'Environment',
              'value': `${scope}`,
              'short': true
          }
        ],
        'color': color[type]
      }
    ];

    return attachments;
  };

  /**
   * Scope of the message
   * @type {String}
   */
  let scope = Meteor.isClient ? 'client' : 'server';
  let response;
  let attachments = createAttachment(message, type, scope);

  let payload = JSON.stringify({
    icon_url,
    username,
    channel,
    attachments,
  });
  /**
   * HTTP.post payload on slack webhook
   * @param  {String} webhookLink
   * @param  {Object} options.payload: payload all information to send slack
   * @return {Object} response about the payload
   */
  response = HTTP.post(webhookLink, {
    payload: payload
  }, (error, response) => {
    if (error) {
      throw new Meteor.Error(`[SlackLog] Request Error# ${error}`);
    }

    /**
     * Throw Error for improper POST on slack webhook
     */
    if (response.statusCode !== 200 ||
       (response.statusCode === 200 && !response.data.ok)) {
      throw new Meteor.Error(`[SlackLog] Improper response#
        ${JSON.stringify(response)}, request: ${payload}`);
    }
  });
};

slackLog = {
  message(text) {
    sendSlack(text, 'message');
  },
  error(text) {
    sendSlack(text, 'error');
  },
  success(text) {
    sendSlack(text, 'success');
  }
};



