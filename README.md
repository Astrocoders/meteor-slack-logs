Slack Log
==========

Send client & server logs on your slack channel

## Installation
Add it to your project with Meteor packages system

```sh
$ meteor add astrocoders:slack-logs
```

## Why?
We spend a lot time on slack. Nothing more cool than receive logs in
a specific #channel and be quickly aware of what is happening in your meteor
application client and server side.

Bonus: ability to autolog exceptions on client and server.
See below how to enable.

## Usage

#### Get slack webhook url

1. Go to your slack custom integration `https://<yourteam>.slack.com/apps/manage/custom-integrations`;
2. Click on Add configuration
3. Choose the channel you would like to post the logs
4. Copy the webhook url
5. Done on slack admin!

#### Config your settings

`settings.json`
```
{
  "public": {
    "slack": {
      "isProd": true, //useful to no oversend errors when developing new features
      "webhook": "your webhook url",
      "botUsername": "myappbot",
      "iconUrl": "http://myimagelink.jpg",
      "channel": "#channel", // if you want to change the channel
      "appName": "myApp",
      "appUrl": "https://myapp.com",
      "trackGlobalErrors": true, // enable global exception logs
      "blackList": ["black", "list", "heartbeat"]
    }
  }
}
```

Remember `settings.json` does not allow comments. Please take them off in your app.

Done with the configuration!

## Black list inconvenient messages

In the `blackList` array add strings you wouldn't like to be logged.

For example "heartbeat" it's a thrown error that global tracker will get. To prevent that
just add it on `blackList`.

## Custom logs

You can send your own logs too. Slacklog has three methods

1. `slackLog.message('your message')`
2. `slackLog.error('your message')`
3. `slackLog.success('your message')`

They have their own color. If needed we can implement color settings for them.

## Testing

Run tests using Meteor Command

```sh
$ meteor test-packages ./
```

## Inspiration

Highly inspired on [clionelabs/meteor-slacklog](https://github.com/clionelabs/meteor-slacklog)

## License

MIT. Enjoy!
