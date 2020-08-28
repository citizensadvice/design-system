const initTables = () => {
  try {
    const tables = document.getElementsByClassName('cads-table'); // eslint-disable-line

    /* eslint-disable no-restricted-syntax */
    if (tables) {
      for (const table of tables) {
        try {
          const tbody = table.getElementsByTagName('tbody')[0];
          const rows = tbody.getElementsByTagName('tr');
          const headingCells = rows[0].getElementsByTagName('th');
          const headings = [];

          for (const heading of headingCells) {
            headings.push(heading.innerText);
          }

          for (const row of rows) {
            const cells = row.getElementsByTagName('td');
            for (let c = 0; c < cells.length; ++c) {
              const cell = cells[c];
              cell.innerHTML = `<span class="cads-table__th-heading">${headings[c]}</span>${cell.innerHTML}`;
            }
          }
        } catch (e) {
          console.warn(`Error ${e} initialising table ${table}`);
        }
      }
    }
  } catch (e) {
    console.warn(`Could not initialise tables. ${e}`);
  }
};

export default initTables;
