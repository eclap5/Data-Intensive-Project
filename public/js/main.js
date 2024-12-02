const tableSelect = document.getElementById('table-select');
const formFields = document.getElementById('form-fields');
const dynamicForm = document.getElementById('dynamic-form');
const EU = document.getElementById('EU');
const NA = document.getElementById('NA');
const AS = document.getElementById('AS')
const getTable = async (region, selectedTable) => {
    const response = await fetch(`/${region}/${selectedTable}`)
    const data = await response.json()
    console.log(data)
    return data
}
const deleteRow = async (region, table, id) => {
    try {
        const response = await fetch(`/${region}/${table}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert('Row deleted successfully!');
            document.getElementById(`row-${id}`).remove(); // Remove row from the DOM
        } else {
            alert('Failed to delete row.');
        }
    } catch (error) {
        console.error('Error deleting row:', error);
        alert('Error deleting row.');
    }
};

const printData = (region, selectedTable, tabledata) => {
    const showDiv = document.getElementById('show-DB');
    const keys = Object.keys(tabledata[0])
    if (!document.getElementById('Labels')) {
        const labelRow = document.createElement('div');
        labelRow.classList.add('label-row');
        labelRow.id = "Labels"; // Corrected to match the ID check

        // Create label elements
        keys.forEach(key => {
            const label = document.createElement('p');
            label.classList.add('label');
            label.innerHTML = key; // Use the key as the label text
            labelRow.appendChild(label);
        });


        showDiv.appendChild(labelRow); // Append the label row to the container
    }


    tabledata.forEach(element => {
        console.log(element[keys[0]])
        const row = document.createElement('div');
        row.classList.add('row');
        keys.forEach(key => {
            const p = document.createElement('p');
            p.classList.add(key);
            p.innerHTML = element[key];
            row.appendChild(p);
        });
        row.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete row with ID: ${element[keys[0]]}?`)) {
                deleteRow(region, selectedTable, element[keys[0]]);
            }
        });
        showDiv.appendChild(row)
    });

}


tableSelect.addEventListener('change', async () => {
    const showDiv = document.getElementById('show-DB');
    showDiv.textContent = '';
    const selectedTable = tableSelect.value;
    let data = '';
    if (selectedTable == "") {
        return
    }
    if (EU.checked) {
        printData('eu', selectedTable, await getTable('EU', selectedTable))
    }
    if (NA.checked) {
        printData('na', selectedTable, await getTable('NA', selectedTable))
    }
    if (AS.checked) {
        printData('as', selectedTable, await getTable('AS', selectedTable))
    }

});