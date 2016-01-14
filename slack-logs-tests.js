/**
 * Stubs
 */

Meteor.settings = {
  public: {
    slack: {
      isProd: true,
      webhook: 'https://slackwebkook.com',
      botUsername: 'testbot',
      iconUrl: 'icon_url',
      channel: '#channel',
      appName: 'myApp',
      appUrl: 'https://myapp.com/img.jpg',
    }
  }
};

Tinytest.add(`slackLog - should have message method`, (test) => {
  test.isTrue(_.isFunction(slackLog.message));
});

Tinytest.add(`slackLog - should have error method`, (test) => {
  test.isTrue(_.isFunction(slackLog.error));
});

Tinytest.add(`slackLog - should have success method`, (test) => {
  test.isTrue(_.isFunction(slackLog.success));
});

Tinytest.add(`slackLog - HTTP.post - should received url string as first arg`,
  (test) => {
    let postArgs;
    let urlPattern = new RegExp('(http|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');

    HTTP.post = function(...args) {
      postArgs = args;
    };

    slackLog.message('testing HTTP.post - should received url string as first arg');
    test.isTrue(urlPattern.test(postArgs[0]));
});

Tinytest.add(`slackLog - HTTP.post - should received object with headers & content`,
  (test) => {
    let postArgs;
    HTTP.post = function(...args) {
      postArgs = args;
    };

    slackLog.message('testing HTTP.post - should received object with headers & content');

    test.isTrue(_.isObject(postArgs[1]));
    test.equal(Object.keys(postArgs[1])[0], 'headers');
    test.equal(Object.keys(postArgs[1])[1], 'content');
});

Tinytest.add(`slackLog - HTTP.post - Payload - should have attachments array`,
  (test) => {
    let postArgs;
    HTTP.post = function(...args) {
      postArgs = args;
    };

    slackLog.message('testing HTTP.post - Payload - should have attachments array');

    let content = EJSON.parse(postArgs[1].content);

    test.isTrue(_.isArray(content.attachments));
});

Tinytest.add(`slackLog - HTTP.post - Payload - should not send same message in a row in less then 10 seconds`,
  (test) => {
    let postArgsArray = [];

    HTTP.post = function(...args) {
      postArgsArray.push(args);
    };

    _.times(4, () => {
      slackLog.message('testing messages in a row');
    });

    test.isTrue(postArgsArray.length === 1);
});