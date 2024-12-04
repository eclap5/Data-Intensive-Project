const tableSelect = document.getElementById('table-select');
const formFields = document.getElementById('form-fields');
const modifyFields = document.getElementById('modify');
const showDiv = document.getElementById('show-DB');

const EU = document.getElementById('EU');
const NA = document.getElementById('NA');
const AS = document.getElementById('AS')
const getTable = async (region, selectedTable) => { // fetch table 
    const response = await fetch(`/${region}/${selectedTable}`)
    const data = await response.json()
    console.log(data)
    return data
}
const deleteRow = async (region, table, id) => { // delete clicked row
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

const insertRow = async (region, selectedTable) => {
    const inputs = Array.from(document.querySelectorAll('#modify input')); // get all inputs created
    const columns = [];
    const values = [];

    inputs.slice(1).forEach(input => {
        columns.push(input.placeholder);  // Use the placeholder as column name
        values.push(input.value);         // Use the input value as the value for insertion
    });

    try {
        const response = await fetch(`/${region}/${selectedTable}`, { // make new row to currently selected table
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ columns, values })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Data inserted successfully!');
            console.log(data);
        } else {
            alert('Failed to insert data.');
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        alert('Error inserting data.');
    }
    showDiv.textContent = ''; // clear existing data
    printData(region, selectedTable, await getTable(region, selectedTable));
};

const updateRow = async (region, selectedTable) => {
    const inputs = Array.from(document.querySelectorAll('#modify input')); // get all inputs created
    const columns = [];
    const values = [];
    const id = inputs[0].value // first input is the id

    inputs.slice(1).forEach(input => {
        columns.push(input.placeholder);  // Use the placeholder as column name
        values.push(input.value);         // Use the input value as the value for insertion
    });

    try {
        const response = await fetch(`/${region}/${selectedTable}/${id}`, { // make new row to currently selected table
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ columns, values })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Data inserted successfully!');
            console.log(data);
        } else {
            alert('Failed to insert data.');
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        alert('Error inserting data.');
    }
    showDiv.textContent = ''; // clear existing data
    printData(region, selectedTable, await getTable(region, selectedTable));
};


const printData = (region, selectedTable, tabledata) => {
    const keys = Object.keys(tabledata[0]) // get labels of the table
   
    if (!document.getElementById('Labels')) { // if labels are not yet made create them (used when multiple tables are selected)
        const labelRow = document.createElement('div');
        labelRow.classList.add('label-row');
        labelRow.id = "Labels";

        // Create label elements
        keys.forEach(key => {
            const label = document.createElement('p');
            label.classList.add('label');
            label.innerHTML = key;
            labelRow.appendChild(label);
        });
        showDiv.appendChild(labelRow);
    }


    tabledata.forEach(element => { // make new row for each table row

        const row = document.createElement('div');
        row.classList.add('row');
        row.id = `row-${element[keys[0]]}`
        keys.forEach(key => {
            const p = document.createElement('p'); // make p elements for each column in that row
            p.classList.add(key);
            p.innerHTML = element[key];
            row.appendChild(p);
        });
        row.addEventListener('click', () => { // event listener for deleting the row from DB
            if (confirm(`Are you sure you want to delete row with ID: ${element[keys[0]]}?`)) { // use browser confirm to ensure right row
                deleteRow(region, selectedTable, element[keys[0]]);
            }
        });
        showDiv.appendChild(row)
    });
    createInputs(keys, selectedTable, region);
}



// create inputs for creating data to selected table
const createInputs = (fields, selectedTable, region) => {
    modifyFields.textContent = '';  // Clear existing inputs


    fields.forEach(label => {
        const input = document.createElement('input');
        input.classList.add('input');
        input.placeholder = label;
        modifyFields.append(input);
    });

    // Create buttons to insert and update data
    const text = document.createElement('p');
    text.textContent = "ID(first input) is only used for updating rows"
    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert Data';
    
    insertButton.addEventListener('click', () => {
        insertRow(region, selectedTable);
        document.querySelectorAll('#input input').forEach(input => input.value = '');
    }); // call insert row function to make post request
    
    const updateButton = document.createElement('button');
    updateButton.textContent = "Update row";
    updateButton.addEventListener('click', () => updateRow(region, selectedTable))
    modifyFields.append(text);
    modifyFields.append(updateButton);
    modifyFields.append(insertButton);
};



tableSelect.addEventListener('change', async () => { // event listener for dropdown menu which has tables
    const showDiv = document.getElementById('show-DB');
    showDiv.textContent = '';
    const selectedTable = tableSelect.value;
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