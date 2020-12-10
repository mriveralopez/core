function filtrar(event) {
    // Declare variables
    var input, filter, select, options, a, i, txtValue;
    input = event.currentTarget;
    filter = input.value.toUpperCase();
    select = input.parentElement;
    options = select.children;
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 1; i < options.length; i++) {
      a = options[i];
      txtValue = a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        options[i].style.display = "";
      } else {
        options[i].style.display = "none";
      }
    }
  }