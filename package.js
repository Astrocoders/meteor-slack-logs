Package.describe({
  name: 'astrocoders:slack-logs',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'check',
    'json',
    'http',
  ]);

  api.addFiles('slack-logs.js');
  api.addFiles('global-error-logging-client.js', 'client');
  api.addFiles('global-error-logging-server.js', 'server');
  api.export('slackLog');
});

Package.onTest(function(api) {
  api.use([
    'astrocoders:slack-logs',
    'tinytest',
    'ecmascript',
    'check',
    'json',
    'http',
    'underscore',
  ]);

  api.addFiles('slack-logs-tests.js');
});
