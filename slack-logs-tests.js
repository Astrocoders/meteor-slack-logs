/**
 * Stubs
 */

Meteor.settings = {
  public: {
    slack: {
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

    slackLog.message('testing HTTP.post');
    test.isTrue(urlPattern.test(postArgs[0]));
});

Tinytest.add(`slackLog - HTTP.post - should received object with payload`,
  (test) => {
    let postArgs;
    HTTP.post = function(...args) {
      postArgs = args;
    };

    slackLog.message('testing HTTP.post');

    test.isTrue(_.isObject(postArgs[1]));
    test.equal(Object.keys(postArgs[1])[0], 'payload');
});

Tinytest.add(`slackLog - HTTP.post - Payload - should have attachments array`,
  (test) => {
    let postArgs;
    HTTP.post = function(...args) {
      postArgs = args;
    };

    slackLog.message('testing HTTP.post');

    let payloadObj = JSON.parse(postArgs[1].payload);

    test.isTrue(_.isArray(payloadObj.attachments));
});



