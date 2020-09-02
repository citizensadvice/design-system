const childProcess = require('child_process');

const wcag = childProcess.exec(
  'cd testing && npx pa11y https://www.citizensadvice.org.uk/immigration'
);

wcag.stdout.on('data', (chunk) => {
  console.log(chunk);
});
