/*
    This is based on this https://github.com/creationix/haml-js

    It has been updated to mostly ES6 code and made to export an ES6
    module for webpack. See the bottom of the file on how to test
    from the command line.
*/

// Disable the following lint rules as we don't want to go about changing
// the magic code too much...
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-new-func */
/* eslint-disable no-eval */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */

let embedder;
let forceXML;
let escaperName = 'html_escape';
let escapeHtmlByDefault;

function html_escape(text) {
    return text
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Split interpolated strings into an array of literals and code fragments.
function parse_interpol(value) {
    const items = [];
    let pos = 0;
    let next = 0;
    let match;

    while (true) {
        // Match up to embedded string
        next = value.substr(pos).search(embedder);
        if (next < 0) {
            if (pos < value.length) {
                items.push(JSON.stringify(value.substr(pos)));
            }
            break;
        }
        items.push(JSON.stringify(value.substr(pos, next)));
        pos += next;

        // Match embedded string
        match = value.substr(pos).match(embedder);
        next = match[0].length;
        if (next < 0) {
            break;
        }
        if (match[1] === '#') {
            items.push(`${escaperName}(${match[2] || match[3]})`);
        } else {
            // unsafe!!!
            items.push(match[2] || match[3]);
        }

        pos += next;
    }

    return items.filter(part => part && part.length > 0).join(' +\n');
}

function render_attribs(attribs) {
    let key;
    let value;
    const result = [];

    // eslint-disable-next-line
    for (key in attribs) {
        if (key[key.length - 1] === '?') {
            value = `${escaperName}(${attribs[key]})`;
            result.push(
                `" + (${attribs[key]} ? " ${key.replace(
                    '?',
                    ''
                )}=\\"" + ${value} + "\\"" : "") + "`
            );
            continue;
        }
        if (key !== '_content' && attribs.hasOwnProperty(key)) {
            /* eslint-disable indent */
            switch (attribs[key]) {
                case 'undefined':
                case 'false':
                case 'null':
                case '""':
                    break;
                default:
                    try {
                        value = JSON.parse(`[${attribs[key]}]`)[0];
                        if (value === true) {
                            value = key;
                        } else if (
                            typeof value === 'string' &&
                            embedder.test(value)
                        ) {
                            value = `" +\n${parse_interpol(
                                html_escape(value)
                            )} +\n"`;
                        } else {
                            value = html_escape(value);
                        }
                        result.push(` ${key}=\\"${value}\\"`);
                    } catch (e) {
                        result.push(
                            ` ${key}=\\"" + ${escaperName}(${attribs[key]}) + "\\"`
                        );
                    }
                    break;
            }
            /* eslint-enable indent */
        }
    }
    return result.join('');
}

// Parse the attribute block using a state machine
function parse_attribs(line) {
    const attributes = {};
    const l = line.length;
    let i;
    let c;
    let count = 1;
    let quote = false;
    let skip = false;
    let pair = {
        start: 1,
        middle: null,
        end: null
    };

    if (!(l > 0 && (line.charAt(0) === '{' || line.charAt(0) === '('))) {
        return {
            _content: line[0] === ' ' ? line.substr(1, l) : line
        };
    }
    const open = line.charAt(0);
    const close = open === '{' ? '}' : ')';
    const joiner = open === '{' ? ':' : '=';
    const seperator = open === '{' ? ',' : ' ';

    function process_pair() {
        if (
            typeof pair.start === 'number' &&
            typeof pair.middle === 'number' &&
            typeof pair.end === 'number'
        ) {
            const key = line
                .substr(pair.start, pair.middle - pair.start)
                .trim();
            const value = line
                .substr(pair.middle + 1, pair.end - pair.middle - 1)
                .trim();
            attributes[key] = value;
        }
        pair = {
            start: null,
            middle: null,
            end: null
        };
    }

    for (i = 1; count > 0; i += 1) {
        // If we reach the end of the line, then there is a problem
        if (i > l) {
            throw new Error('Malformed attribute block');
        }

        c = line.charAt(i);
        if (skip) {
            skip = false;
        } else if (quote) {
            if (c === '\\') {
                skip = true;
            }
            if (c === quote) {
                quote = false;
            }
        } else {
            if (c === '"' || c === "'") {
                quote = c;
            }

            if (count === 1) {
                if (c === joiner) {
                    pair.middle = i;
                }
                if (c === seperator || c === close) {
                    pair.end = i;
                    process_pair();
                    if (c === seperator) {
                        pair.start = i + 1;
                    }
                }
            }

            if (c === open || c === '(') {
                count += 1;
            }
            if (c === close || (count > 1 && c === ')')) {
                count -= 1;
            }
        }
    }

    attributes._content = line.substr(i, line.length);
    return attributes;
}

// Used to find embedded code in interpolated strings.
embedder = /([#!])\{([^}]*)\}/;

const selfCloseTags = [
    'meta',
    'img',
    'link',
    'br',
    'hr',
    'input',
    'area',
    'base'
];

// All matchers' regexps should capture leading whitespace in first capture
// and trailing content in last capture
const matchers = [
    // html tags
    {
        name: 'html tags',
        regexp: /^(\s*)((?:[.#%][a-z_-][a-z0-9_:-]*)+)(.*)$/i,
        process() {
            let tag;
            let classes;
            let ids;
            let attribs;
            let content;
            const whitespace = {};
            let output;
            const line_beginning = this.matches[2];
            classes = line_beginning.match(/\.([a-z_-][a-z0-9_-]*)/gi);
            ids = line_beginning.match(/#([a-z_-][a-z0-9_-]*)/gi);
            tag = line_beginning.match(/%([a-z_-][a-z0-9_:-]*)/gi);

            // Default to <div> tag
            tag = tag ? tag[0].substr(1, tag[0].length) : 'div';

            attribs = this.matches[3];
            if (attribs) {
                attribs = parse_attribs(attribs);
                if (attribs._content) {
                    const leader0 = attribs._content.charAt(0);
                    const leader1 = attribs._content.charAt(1);
                    let leaderLength = 0;

                    if (leader0 === '<') {
                        leaderLength++;
                        whitespace.inside = true;
                        if (leader1 === '>') {
                            leaderLength++;
                            whitespace.around = true;
                        }
                    } else if (leader0 === '>') {
                        leaderLength++;
                        whitespace.around = true;
                        if (leader1 === '<') {
                            leaderLength++;
                            whitespace.inside = true;
                        }
                    }
                    attribs._content = attribs._content.substr(leaderLength);
                    // once we've identified the tag and its attributes, the rest is content.
                    // this is currently trimmed for neatness.
                    this.contents.unshift(attribs._content.trim());
                    delete attribs._content;
                }
            } else {
                attribs = {};
            }

            if (classes) {
                classes = classes
                    .map(klass => klass.substr(1, klass.length))
                    .join(' ');
                if (attribs.class) {
                    try {
                        attribs.class = JSON.stringify(
                            `${classes} ${JSON.parse(attribs.class)}`
                        );
                    } catch (e) {
                        attribs.class = `${JSON.stringify(`${classes} `)} + ${
                            attribs.class
                        }`;
                    }
                } else {
                    attribs.class = JSON.stringify(classes);
                }
            }
            if (ids) {
                ids = ids.map(id => id.substr(1, id.length)).join(' ');
                if (attribs.id) {
                    attribs.id = JSON.stringify(`${ids} `) + attribs.id;
                } else {
                    attribs.id = JSON.stringify(ids);
                }
            }

            attribs = render_attribs(attribs);

            content = this.render_contents();
            if (content === '""') {
                content = '';
            }

            if (whitespace.inside) {
                if (content.length === 0) {
                    content = '"  "';
                } else {
                    try {
                        // remove quotes if they are there
                        content = `" ${JSON.parse(content)} "`;
                    } catch (e) {
                        content = `" "+\n${content}+\n" "`;
                    }
                }
            }

            if (
                forceXML
                    ? content.length > 0
                    : selfCloseTags.indexOf(tag) === -1
            ) {
                output = `"<${tag}${attribs}>"${
                    content.length > 0 ? ` + \n${content}` : ''
                } + \n"</${tag}>"`;
            } else {
                output = `"<${tag}${attribs} />"`;
            }

            if (whitespace.around) {
                // output now contains '"<b>hello</b>"'
                // we need to crack it open to insert whitespace.
                output = `" ${output.substr(1, output.length - 2)} "`;
            }

            return output;
        }
    },

    // each loops
    {
        name: 'each loop',
        regexp: /^(\s*)(?::for|:each)\s+(?:([a-z_][a-z_-]*),\s*)?([a-z_][a-z_-]*)\s+in\s+(.*)(\s*)$/i,
        process() {
            const ivar = this.matches[2] || '__key__'; // index
            const vvar = this.matches[3]; // value
            const avar = this.matches[4]; // array
            const rvar = '__result__'; // results

            if (this.matches[5]) {
                this.contents.unshift(this.matches[5]);
            }

            return `(function () { var ${rvar} = [], ${ivar}, ${vvar}; for (${ivar} in ${avar}) { if (${avar}.hasOwnProperty(${ivar})) { ${vvar} = ${avar}[${ivar}]; ${rvar}.push(\n${this.render_contents() ||
                "''"}\n); } } return ${rvar}.join(""); }).call(this)`;
        }
    },

    // if statements
    {
        name: 'if',
        regexp: /^(\s*):if\s+(.*)\s*$/i,
        process: () => {
            const condition = this.matches[2];
            this.pushIfCondition([condition]);
            return `(function () { if (${condition}) { return (\n${this.render_contents() ||
                ''}\n);} else { return ""; } }).call(this)`;
        }
    },

    // else if statements
    {
        name: 'else if',
        regexp: /^(\s*):else if\s+(.*)\s*$/i,
        process: () => {
            const condition = this.matches[2];
            const conditionsArray = this.getIfConditions()[
                this.getIfConditions().length - 1
            ];
            const ifArray = [];

            for (let i = 0, l = conditionsArray.length; i < l; i++) {
                ifArray.push(`! (${conditionsArray[i]})`);
            }
            conditionsArray.push(condition);
            ifArray.push(condition);
            const ifStatement = `if (${ifArray.join(' && ')}) { `;
            return `(function () { ${ifStatement}return (\n${this.render_contents() ||
                ''}\n);} else { return ""; } }).call(this)`;
        }
    },

    // else statements
    {
        name: 'else',
        regexp: /^(\s*):else\s*$/i,
        process: () => {
            const conditionsArray = this.popIfCondition();
            const ifArray = [];

            for (let i = 0, l = conditionsArray.length; i < l; i++) {
                ifArray.push(`! (${conditionsArray[i]})`);
            }

            const ifStatement = `if (${ifArray.join(' && ')}) { `;
            return `(function () { ${ifStatement}return (\n${this.render_contents() ||
                ''}\n);} else { return ""; } }).call(this)`;
        }
    },

    // silent-comments
    {
        name: 'silent-comments',
        regexp: /^(\s*)-#\s*(.*)\s*$/i,
        process: () => '""'
    },

    // html-comments
    {
        name: 'silent-comments',
        regexp: /^(\s*)\/\s*(.*)\s*$/i,
        process: () => {
            this.contents.unshift(this.matches[2]);

            return `"<!--${this.contents.join('\\n').replace(/"/g, '\\"')}-->"`;
        }
    },

    // raw js
    {
        name: 'rawjs',
        regexp: /^(\s*)-\s*(.*)\s*$/i,
        process: () => {
            this.contents.unshift(this.matches[2]);
            return `"";${this.contents.join('\n')}; _$output = _$output `;
        }
    },

    // raw js
    {
        name: 'pre',
        regexp: /^(\s*):pre(\s+(.*)|$)/i,
        process: () => {
            this.contents.unshift(this.matches[2]);
            return `"<pre>"+\n${JSON.stringify(
                this.contents.join('\n')
            )}+\n"</pre>"`;
        }
    },

    // declarations
    {
        name: 'doctype',
        regexp: /^()!!!(?:\s*(.*))\s*$/,
        process: () => {
            let line = '';

            /* eslint-disable indent */
            switch ((this.matches[2] || '').toLowerCase()) {
                case '':
                    // XHTML 1.0 Transitional
                    line =
                        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
                    break;
                case 'strict':
                case '1.0':
                    // XHTML 1.0 Strict
                    line =
                        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
                    break;
                case 'frameset':
                    // XHTML 1.0 Frameset
                    line =
                        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">';
                    break;
                case '5':
                    // XHTML 5
                    line = '<!DOCTYPE html>';
                    break;
                case '1.1':
                    // XHTML 1.1
                    line =
                        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">';
                    break;
                case 'basic':
                    // XHTML Basic 1.1
                    line =
                        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">';
                    break;
                case 'mobile':
                    // XHTML Mobile 1.2
                    line =
                        '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">';
                    break;
                case 'xml':
                    // XML
                    line = "<?xml version='1.0' encoding='utf-8' ?>";
                    break;
                case 'xml iso-8859-1':
                    // XML iso-8859-1
                    line = "<?xml version='1.0' encoding='iso-8859-1' ?>";
                    break;
                default:
                    break;
            }
            /* eslint-enable indent */

            return JSON.stringify(`${line}\n`);
        }
    },

    // Embedded markdown. Needs to be added to exports externally.
    {
        name: 'markdown',
        regexp: /^(\s*):markdown\s*$/i,
        process: () =>
            parse_interpol(exports.Markdown.encode(this.contents.join('\n')))
    },

    // script blocks
    {
        name: 'script',
        regexp: /^(\s*):(?:java)?script\s*$/,
        process: () =>
            parse_interpol(
                `\n<script type="text/javascript">\n//<![CDATA[\n${this.contents.join(
                    '\n'
                )}\n//]]>\n</script>\n`
            )
    },

    // css blocks
    {
        name: 'css',
        regexp: /^(\s*):css\s*$/,
        process: () =>
            JSON.stringify(
                `<style type="text/css">\n${this.contents.join('\n')}\n</style>`
            )
    }
];

function compile(lines) {
    let block = false;
    const output = [];
    const ifConditions = [];

    // If lines is a string, turn it into an array
    if (typeof lines === 'string') {
        lines = lines
            .trim()
            .replace(/\n\r|\r/g, '\n')
            .split('\n');
    }

    lines.forEach(line => {
        let match;
        let found = false;

        // Collect all text as raw until outdent
        if (block) {
            match = block.check_indent.exec(line);
            if (match) {
                block.contents.push(match[1] || '');
                return;
            }

            output.push(block.process());
            block = false;
        }

        matchers.forEach(matcher => {
            if (!found) {
                match = matcher.regexp.exec(line);
                if (match) {
                    block = {
                        contents: [],
                        indent_level: match[1],
                        matches: match,
                        check_indent: new RegExp(
                            `^(?:\\s*|${match[1]}  (.*))$`
                        ),
                        process: matcher.process,
                        getIfConditions: () => ifConditions,
                        pushIfCondition: condition =>
                            ifConditions.push(condition),
                        popIfCondition: () => ifConditions.pop(),
                        render_contents() {
                            return compile(this.contents);
                        }
                    };
                    found = true;
                }
            }
        });

        // Match plain text
        if (!found) {
            output.push(
                (() => {
                    // Escaped plain text
                    if (line[0] === '\\') {
                        return parse_interpol(line.substr(1, line.length));
                    }

                    function escapedLine() {
                        try {
                            return `${escaperName}(${JSON.stringify(
                                JSON.parse(line)
                            )})`;
                        } catch (e2) {
                            return `${escaperName}(${line})`;
                        }
                    }

                    function unescapedLine() {
                        try {
                            return parse_interpol(JSON.parse(line));
                        } catch (e) {
                            return line;
                        }
                    }

                    // always escaped
                    if (line.substr(0, 2) === '&=') {
                        line = line.substr(2, line.length).trim();
                        return escapedLine();
                    }

                    // never escaped
                    if (line.substr(0, 2) === '!=') {
                        line = line.substr(2, line.length).trim();
                        return unescapedLine();
                    }

                    // sometimes escaped
                    if (line[0] === '=') {
                        line = line.substr(1, line.length).trim();
                        if (escapeHtmlByDefault) {
                            return escapedLine();
                        }
                        return unescapedLine();
                    }

                    // Plain text
                    return parse_interpol(line);
                })()
            );
        }
    });
    if (block) {
        output.push(block.process());
    }

    let txt = output.filter(part => part && part.length > 0).join(' +\n');
    if (txt.length === 0) {
        txt = '""';
    }
    return txt;
}

function optimize(js) {
    const new_js = [];
    let buffer = [];
    let part;
    let end;

    function flush() {
        if (buffer.length > 0) {
            new_js.push(JSON.stringify(buffer.join('')) + end);
            buffer = [];
        }
    }
    js.replace(/\n\r|\r/g, '\n')
        .split('\n')
        .forEach(line => {
            part = line.match(/^(".*")(\s*\+\s*)?$/);
            if (!part) {
                flush();
                new_js.push(line);
                return;
            }
            end = part[2] || '';
            part = part[1];
            try {
                buffer.push(JSON.parse(part));
            } catch (e) {
                flush();
                new_js.push(line);
            }
        });
    flush();
    return new_js.join('\n');
}

function execute(js, self) {
    return function() {
        try {
            let _$output;
            eval(`_$output =${js}`);
            return _$output; // set in eval
        } catch (e) {
            return `\n<pre class='error'>${html_escape(
                `${e}\n${e.stack}`
            )}</pre>\n`;
        }
    }.call(self);
}

const Haml = function Haml(haml, config) {
    if (typeof config !== 'object') {
        forceXML = config;
        config = {};
    }

    let escaper;
    if (config.customEscape) {
        escaper = '';
        escaperName = config.customEscape;
    } else {
        escaper = `${html_escape.toString()}\n`;
        escaperName = 'html_escape';
    }

    escapeHtmlByDefault =
        config.escapeHtmlByDefault || config.escapeHTML || config.escape_html;

    const js = optimize(compile(haml));

    const str = `try {\n
   var _$output=
${js}
;\n return _$output;
  } catch (e) {\n
    return "\\n<pre class='error'>" +
${escaperName}
(e + "\\n" + e.stack) + "</pre>\\n";\n
}`;

    try {
        const f = new Function('locals', escaper + str);
        return f;
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.error(str);
        }
        throw e;
    }
};

function render(text, options) {
    if (!text || text === '') {
        return '<pre class="error">No input provided</pre>';
    }

    const o = options || {};
    let js = compile(text, o);
    if (o.optimize) {
        js = Haml.optimize(js);
    }
    return execute(js, o.context || Haml, o.locals);
}

Haml.compile = compile;
Haml.optimize = optimize;
Haml.render = render;
Haml.execute = execute;
Haml.html_escape = html_escape;

export default Haml;
/* eslint-disable */
// To test from cli comment out the export above, uncomment the below and run
// node haml.js <path to haml partial>
// When you're done comment the code below and uncomment the export line above
// const path = require('path');
// const fs = require('fs');
// const filename = path.join(__dirname, process.argv[2]);
// const hf = fs.readFileSync(filename, 'utf8');
// const hr = Haml.render(hf);
// console.log(hr);
