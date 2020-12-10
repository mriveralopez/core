function filtrar(tableId,col) {
    column = 0;
    if(col){
      column = col;
    }
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filterInput"); //id del input buscar
    filter = input.value.toUpperCase();
    table = document.getElementById("filterTable");
    if(tableId){
        //si el id de la tabla se especifica
        table = document.getElementById(tableId);
    }
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[column];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }