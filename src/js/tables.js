const initTables = () => {
    try {
        const tables = document.getElementsByClassName('cads-table'); // eslint-disable-line

        if (tables) {
            for (let i = 0; i < tables.length; i++) {
                const table = tables[i];
                try {
                    const tbody = table.getElementsByTagName('tbody')[0];
                    const rows = tbody.getElementsByTagName('tr');
                    const headingCells = rows[0].getElementsByTagName('th');
                    const headings = [];

                    for (let h = 0; h < headingCells.length; h++) {
                        headings.push(headingCells[h].innerText);
                    }

                    for (let r = 1; r < rows.length; r++) {
                        const row = rows[r];
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
