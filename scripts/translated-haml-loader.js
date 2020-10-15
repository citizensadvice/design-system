/**
 * Webpack loader, takes a haml file as input and outputs
 * an object keyed by translation.
 */
const execNP = require('child_process').exec;

const hamlScript = 'ruby ./scripts/haml.rb';

const translate = (content, lang) => {
  return new Promise((resolve, reject) => {
    const process = execNP(
      `${hamlScript} --language ${lang}`,
      (err, stdout) => {
        if (err) reject(err);

        return resolve({ [lang]: stdout });
      }
    );
    process.stdin.write(content);
    process.stdin.end();
  });
};

module.exports = function loader(content) {
  const callback = this.async();
  Promise.all([translate(content, 'en'), translate(content, 'cy')])
    .then((values) =>
      callback(
        null,
        JSON.stringify(
          Object.assign.apply(this, [{ default: content }, ...values])
        )
      )
    )
    .catch((err) => callback(err));
};

module.exports.raw = true;
