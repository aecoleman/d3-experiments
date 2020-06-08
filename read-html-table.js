// Function to read an HTML table into a JS Array of a 
// structure similar to what d3 reads csv files into
// Arguments:
//   tblSelector <string> CSS Selector which selects the HTML 
//               table in which the data to be read is stored
//   rowConverter <function> function which converts the data
//                which are all read as strings, into the 
//                appropriate type for that column. May also
//                rename the columns or add computed, columns
//                if necessary.
var readTableHTML = function(tblSelector, rowConverter) {

    rowConverter = rowConverter || function(x) { return x };

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
        data[i] = rowConverter(b);
    }

    data["columns"] = colTitles;

    return data;

}
