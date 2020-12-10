var privilegiosSelect = document.getElementById('newPermissionSelect')
var tablaPrivilegios = document.getElementById('tabla-privilegios');
var privilegios = [{}];
var numeroDeLineas = 0;
var selectedIds = [];
document.getElementById("Paceptar").addEventListener('click', function(){
    //alert("Aceptaste");
    var currentID = parseInt(privilegiosSelect.value);
    ////console.log(currentID);
    if(selectedIds.includes(currentID)) return 0;
    selectedIds.push(currentID);
    ////console.log(selectedIds);
    var optionText = privilegiosSelect.selectedOptions[0].innerText
    introducirPrivilegio(optionText, currentID);
    
});
function introducirPrivilegio(optionText, id){
    numeroDeLineas++;
    var row = tablaPrivilegios.tBodies[0].insertRow(-1);
    var numero = row.insertCell(0);
    var descripcionPrivilegio = row.insertCell(1);
    var btn_eliminar = row.insertCell(2);
    
    numero.scope = 'row';
    numero.innerHTML = numeroDeLineas;
    descripcionPrivilegio.innerHTML = "<input class='form-control' current-id='"+id+"' type='text' value ='" + optionText + "' disabled>";
    btn_eliminar.innerHTML = "<a onclick='deleteRow(event)' class='btn btn-danger'>Eliminar</a>";
}
function getPrivilegios() {
    var ruta = "/getPrivilegios";
    $.ajax({
        type: "GET",
        url: ruta,
        data: {},
        async: true,
        dataType: "json",
        success: function(data){
            //console.log(data);
            privilegios = data;
            var inner = "";
            data.forEach(x => {
                inner += "<option value='" + x.codigo + "'>"+ x.nombre + " ---- " + x.descripcion+ "</option>";
            });
            privilegiosSelect.innerHTML = inner;
            
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
    var ruta = "/Rol/guardarTabla"
    var object = {
        'idrol': parseInt(document.getElementById('tabla-privilegios').parentElement.getAttribute('id-rol')),
        'privilegiosId' : selectedIds
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
            if(data){
                alert("Se ha guardado con exito");
            }
            else{
                alert("A ocurrido un error");
            }
            window.location.href = "/Rol";
            
        }
    });
}