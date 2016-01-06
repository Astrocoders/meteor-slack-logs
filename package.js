Package.describe({
  name: 'astrocoders:slack-logs',
  version: '0.0.1',
  summary: 'Logs in your slack channel!',
  git: 'https://github.com/Astrocoders/meteor-slack-logs',
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
