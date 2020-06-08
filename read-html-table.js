
var readTableHTML = function(tblSelector) {

    const tblRows = d3.select(tblSelector).selectAll("tr");

    const colTitleCells = tblRows._groups[0][0].cells;

    var colTitles = [];

    for (let i=0; i < colTitleCells.length; i++) {
        colTitles[i] = colTitleCells.item(i).textContent;
    }

    var data = [];

    for (let i=0; i < tblRows.nodes().length - 1; i++) {

        let b = {};

        data[i] = tblRows.nodes()[i + 1];

        for (let j = 0; j < data[i].childElementCount; j++) {
            b[colTitles[j]] = data[i].children.item(j).textContent;
        }
        data[i] = b;
    }

    data["columns"] = colTitles;

    return data;

}