import sassColours from './_colour-export.scss';

function getColours() {
  const keys = Object.keys(sassColours).filter((item) =>
    item.includes('language')
  );
  return Object.fromEntries(keys.map((key) => [key, sassColours[key]]));
}

export const colours = getColours();

export function colourFor(key) {
  return colours[`language-${key}`];
}

export function swatchFor(key) {
  const colour = colourFor(key);
  return `<span class="cads-styleguide-colour-swatch" style="background-color: ${colour};"></span>`;
}

function prepareForMarkdown(value) {
  return value.replace('_', '\\_').replace('#', '\\#');
}

export function colourLanguageTable(mappings) {
  let result = `<table>`;
  result += `<thead><tr><th>Colour language</th><th>Variables</th><th>Hex value</th></tr></thead>`;
  result += `<tbody>`;

  mappings.forEach((mapping) => {
    const [description, colourKey] = mapping;
    result += '<tr>';
    result += `<td>${swatchFor(colourKey)} ${description}</td>`;
    result += `<td><code>${prepareForMarkdown(
      `$cads-language__${colourKey}`
    )}</code></td>`;
    result += `<td><code>${prepareForMarkdown(
      colourFor(colourKey)
    )}</code></td>`;
    result += '</tr>';
  });

  result += `</tbody></table>`;
  return result;
}
