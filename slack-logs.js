let sendSlack = function(message, type, scope) {
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
    isProd: Boolean,
    webhook: String,
    botUsername: String,
    iconUrl: String,
    channel: String,
    appName: String,
    appUrl: String,
    trackGlobalErrors: Match.Optional(Boolean),
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
   * If non scope sent find out
   * @type {String}
   */
  if (!scope) {scope = Meteor.isClient ? 'client' : 'server';}

  /**
   * Create attachments for slack message
   * @type {Array}
   */
  let attachments = createAttachment(message, type, scope);

  /**
   * Payload stringfied
   * @type {String}
   */
  let payload = EJSON.stringify({
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

  HTTP.post(webhookLink, {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    },
    content: payload,
  }, (error, response) => {
    if (error) {
      console.log(`[SlackLog] Request Error# ${error}`);
      return;
    }

    /**
     * console.log Error for improper POST on slack webhook
     * throwing an error here will generate an infinite loop =)
     */

    if (
        response.statusCode !== 200 ||
        (response.statusCode === 200 && response.content !== 'ok')
    ) {
      console.log(`${EJSON.stringify(response)}, request: ${payload}`);
      return;
    }
  });
};

slackLog = {
  message(text, scope) {
    sendSlack(text, 'message', scope);
  },
  error(text, scope) {
    sendSlack(text, 'error', scope);
  },
  success(text, scope) {
    sendSlack(text, 'success', scope);
  }
};
