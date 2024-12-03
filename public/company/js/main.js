const table = document.getElementById('show-DB');
const tableSelect = document.getElementById('table-select');

async function selectTable() {
    const tableName = tableSelect.value;
    await getData(tableName)
        .then(data => fillTable(data));
}

async function getData(tableName) {
    const res = await fetch(`/company/${tableName}`)
    if (!res.ok) {
        console.error('Error fetching data');
        return;
    }
    return res.json();
        
}

function fillTable(data) {
    if (!data || data.length === 0) {
        console.error('No data available');
        return;
    }
    table.innerHTML = '';
    // Create table header from first element keys
    const thead = document.createElement('thead');
    const th = document.createElement('th');
    const keys = data[0]
    for (let key in keys) {
        const th = document.createElement('th');
        th.textContent = key;
        thead.appendChild(th);
    }
    // Create table rows from data
    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        for (let key in row) {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
}