function fetchDimensions() {
    const rows = +fetchValueById("num_rows");
    const cols = +fetchValueById("num_cols");
    if((rows && cols) && (!isNaN(rows) && !isNaN(cols))) createGrid(rows, cols);
}

function fetchEditData() {
    const row = +fetchValueById("row_number");
    const col = +fetchValueById("col_number");
    const value = fetchValueById("grid_value");
    editGrid(row, col, value);
}

function fetchValueById(id) {
    return document.getElementById(id).value;
}

function editGrid(row, col, value) {
    let rowDiv = document.getElementById(`row_${row}`)
    if(rowDiv) {
        let colDiv = rowDiv.childNodes[col - 1];
        if(colDiv) {
            colDiv.innerText = value ? value : "empty";
            document.getElementById("grid_value").value = "";
        }
    }
}

function createGrid(rows, cols) {
    resetGridDiv();
    document.getElementById("edit_div").style.display = "block";
    const gridDiv = document.getElementById("grid");
    const rowDivs = createRows(rows);
    createCols(cols, rowDivs);
    for(let i = 0; i < rowDivs.length; i++) gridDiv.appendChild(rowDivs[i]);
}

function createRows(numRows) {
    let rowDivsArray = [];

    for(let i = 1; i <= numRows; i++) {
        let currentDiv = document.createElement("div");
        currentDiv.id = `row_${i}`;
        currentDiv.className = "rows";
        rowDivsArray.push(currentDiv);
    }

    return rowDivsArray;
}

function createCols(numCols, rowDivs) {

    const defaultValue = document.getElementById("grid_default").value;

    for(let i = 0; i < rowDivs.length; i++) {
        let currentRow = rowDivs[i];
        for(let j = 1; j <= numCols; j++) {
            let currentCol = document.createElement("div");
            currentCol.id = `col_${j}`;
            currentCol.className = "columns";
            currentCol.innerText = defaultValue ? defaultValue : `empty`;
            currentCol.addEventListener('click', onGridClick);
            currentRow.appendChild(currentCol);
        }
    }
}

function resetGridDiv() {
    const gridDiv = document.getElementById("grid");
    while(gridDiv.firstChild) {
        gridDiv.removeChild(gridDiv.firstChild);
    }
}

function onGridClick(event) {
    resetSelection();
    const colDiv = event.target;
    const rowDiv = colDiv.parentNode;
    const col = getRowOrColNumberFromID(colDiv);
    const row = getRowOrColNumberFromID(rowDiv);
    colDiv.classList.add("currentlySelected");
    const colInput = document.getElementById("col_number");
    const rowInput = document.getElementById("row_number");
    const valueInput = document.getElementById("grid_value");
    colInput.value = col;
    rowInput.value = row;
    valueInput.value = "";
}

function onEditValuesChange() {
    const row = document.getElementById("row_number").value;
    const col = document.getElementById("col_number").value;
    if((row && col) && (!isNaN(+row) && !isNaN(+col))) setSelected(row, col);
}

function setSelected(row, col) {
    resetSelection();
    const rowDiv = document.getElementById(`row_${row}`);
    if(rowDiv) {
        const colDiv = rowDiv.childNodes[col - 1];
        if(colDiv) colDiv.classList.add("currentlySelected");
    }
}

function getRowOrColNumberFromID(div) {
    return div.id.split('').slice('4').join('');
}

function resetSelection() {
    const selected = document.getElementsByClassName("currentlySelected");
    for(let element of selected) {
        element.classList.remove("currentlySelected");
    }
}