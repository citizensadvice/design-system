export default function getColours(type, sass) {
  // Since we get all the vars exported we need to filter them out
  const colours = Object.keys(sass).filter((item) => item.includes(type));

  let result = ``;
  let lastSection = '';
  colours.forEach((item) => {
    // We need to split by section as well
    const matches = item.split('-');
    const section = matches.length > 2 ? matches[1].replace('_', ' ') : '';
    const name = matches[matches.length > 2 ? 2 : 1];
    const colour = sass[item];

    if (section !== lastSection) {
      lastSection = section;
      result += `<h3>${section}</h3>`;
    }

    result += `<div class="cads-styleguide__colour-tile">
<div class="cads-styleguide__colour-tile-bg" style="background: ${colour}"></div>
<p>${name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)}
<br/>${colour.toUpperCase()}</p>
</div>`;
  });

  return result;
}
