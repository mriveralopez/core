var departamentosSelect = document.getElementById('newPermissionSelect')
var tablaDepartamentos = document.getElementById('tabla-departamentos');
var departamentos = [{}];
var numeroDeLineas = 0;
var selectedIds = [];

document.getElementById("Paceptar").addEventListener('click', function(){
    //alert("Aceptaste");
    var currentID = parseInt(departamentosSelect.value);
    ////console.log(currentID);
    if(selectedIds.includes(currentID)) return 0;
    selectedIds.push(currentID);
    ////console.log(selectedIds);
    var optionText = departamentosSelect.selectedOptions[0].innerText
    introducirDepartamento(optionText, currentID);
    
});

function introducirDepartamento(optionText, id){
    numeroDeLineas++;
    var row = tablaDepartamentos.tBodies[0].insertRow(-1);
    var numero = row.insertCell(0);
    var btn_eliminar = row.insertCell(2);
    
    numero.scope = 'row';
    numero.innerHTML = numeroDeLineas;
    btn_eliminar.innerHTML = "<a onclick='deleteRow(event)' class='btn btn-danger'>Eliminar</a>";
}

function getDepartamentos() {
    var ruta = "/getDepartamentos";
    $.ajax({
        type: "GET",
        url: ruta,
        data: {},
        async: true,
        dataType: "json",
        success: function(data){
            //console.log(data);
            departamentos = data;
            var inner = "";
            data.forEach(x => {
                inner += "<option value='" + x.codigo + "'>"+ x.nombre +"</option>";
            });
            departamentosSelect.innerHTML = inner;
            
        }
    });
}

function deleteRow(event) {
    var row = event.currentTarget.parentElement.parentElement;
    var descriptionInput = row.children[1].firstElementChild;
    console.log(selectedIds);
    //console.log(descriptionInput.value);
    var id = parseInt(descriptionInput.getAttribute("current-id")); 
    var i = selectedIds.indexOf(id);
    var newAr = removeItemFromArray(selectedIds , i);
    selectedIds = [];
    selectedIds = newAr;
    console.log(selectedIds);
    tablaPrivilegios.deleteRow(row.rowIndex);
}

function removeItemFromArray(array, i) {    
       
    if (i > -1) {
       array.splice(i, 1);
    }
  
    return array; 
}

function savePermissions(){
    var ruta = "/guardarTabla"
    var object = {
        'idpuesto': parseInt(document.getElementById('tabla-departamentos').parentElement.getAttribute('id-puesto')),
        'departamentosId' : selectedIds
    }
    $.ajax({
        type: "POST",
        url: ruta,
        contentType: 'application/json',
        data: JSON.stringify(object),
        async: true,
        dataType: "json",
        success: function(data){
            console.log(data);
        
            
        }
    });
}