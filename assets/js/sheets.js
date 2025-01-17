  var spData = null;
  function doData(json) {
      spData = json.feed.entry;
  }
  
  function drawCell(tr, val) {
      var td = $("<td/>");
      tr.append(td);
      td.append(val);
      return td;
  }
	
  function drawRow(table, rowData) {
	  if (rowData == null) return null;
	  if (rowData.length == 0) return null;
	  var tr = $("<tr/>");
	  table.append(tr);
	  for(var c=0; c<rowData.length; c++) {
		  drawCell(tr, rowData[c]);
	  }
	  return tr;
  }
  
  function drawTable(parent) {
	  var table = $("<table/>");
	  parent.append(table);
	  return table;
  }
  
  function readData(parent) {
      var data = spData;
      var table = drawTable(parent);
      var rowData = [];
	var tbody;
      
       for(var r=0; r<data.length; r++) {
          var cell = data[r]["gs$cell"];
          var val = cell["$t"];
          if (cell.col == 1) {
              drawRow(table, rowData);
              rowData = [];
          }
          rowData.push(val);
      }
      drawRow(table, rowData);
	  
var myTable = table;
var thead = myTable.find("thead");
var tbody = myTable.find("tbody");
var thRow1 =  myTable.find("tr:first");
var thRows =  myTable.find("tr");

if (thead.length===0){
    thead = jQuery("<thead></thead>").appendTo(myTable);    
}
if (tbody.length===0){
    tbody = jQuery("<tbody></tbody>").appendTo(myTable);    
}
//Add first row to thead
var copy = thRow1.clone(true).appendTo("thead");
thRow1.remove();
	  
//Add all rows to tbody
var copy = thRows.clone(true).appendTo("tbody");
thRows.remove();
	  
//Remove duplicate header
var duplicateHeader = tbody.find("tr:first"); 
duplicateHeader.remove();

return table;
}
$(document).ready(function(){
   var table=readData($("#tablecontainer"));
   table.DataTable({"paging": false});
});
