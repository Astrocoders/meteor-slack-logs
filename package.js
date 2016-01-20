Package.describe({
  name: 'astrocoders:slack-logs',
  version: '1.2.0',
  summary: 'Logs in your slack channel!',
  git: 'https://github.com/Astrocoders/meteor-slack-logs',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'check',
    'ejson',
    'http',
    'underscore',
  ]);

  api.addFiles('slack-logs.js');
  api.addFiles('global-error-logging-client.js', 'client');
  api.addFiles('global-error-logging-server.js', 'server');
  api.addFiles('slack-check-loop.js');
  api.addFiles('slack-check-black-list.js');
  api.export('slackLog');
});

Package.onTest(function(api) {
  api.use([
    'astrocoders:slack-logs',
    'tinytest',
    'ecmascript',
    'check',
    'ejson',
    'http',
    'underscore',
  ]);

  api.addFiles('slack-logs-tests.js');
});
