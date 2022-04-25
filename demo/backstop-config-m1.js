const backstopConfigCommon = require('./backstop-common');

const config = {
  ...backstopConfigCommon('http://host.docker.internal:3000'),
  dockerCommandTemplate:
    'docker run --rm -i --net="host" --mount type=bind,source="{cwd}",target=/src dockerman33/backstopjs:5.4.4 {backstopCommand} {args}',
  engineOptions: {
    args: [
      '--no-sandbox',
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
    ],
    executablePath: '/usr/bin/chromium',
  },
};

module.exports = config;
