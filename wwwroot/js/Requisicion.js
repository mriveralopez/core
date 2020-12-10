var articuloSelect = document.getElementById('newPermissionSelect');
var articuloCantidad = document.getElementById('cantidadModal');
var tablaArticulos = document.getElementById('tabla-articulos');
var articulos = [{}];

var numeroDeLineas = 0;
var selectedIds = [];
document.getElementById("Paceptar").addEventListener('click', function(){
    //alert("Aceptaste");
    var currentID = parseInt(articuloSelect.value);
    var cantidad = parseInt(articuloCantidad.value);
    console.log(cantidad);
    if( isNaN(cantidad)){
        alert("ingresa cantidad");
        return 0;
    }
    //console.log(currentID);
    if(selectedIds.includes(currentID)) return 0;
    selectedIds.push(currentID);
    ////console.log(selectedIds);*/
    var optionText = articuloSelect.selectedOptions[0].innerText
    introducirArticulo(optionText, currentID,cantidad);
    
});
function introducirArticulo(optionText, id ,cantidad){
    numeroDeLineas++;
    var row = tablaArticulos.tBodies[0].insertRow(-1);
    var numero = row.insertCell(0);
    var descripcionPrivilegio = row.insertCell(1);
    var cantidadInput = row.insertCell(2);
    var btn_eliminar = row.insertCell(3);
    
    numero.scope = 'row';
    numero.innerHTML = numeroDeLineas;
    descripcionPrivilegio.innerHTML = "<input class='form-control' current-id='"+id+"' type='text' value ='" + optionText + "' disabled>";
    cantidadInput.innerHTML="<input class='form-control'  type='text' value ='" + cantidad + "' disabled>";
    btn_eliminar.innerHTML = "<a onclick='deleteRow(event)' class='btn btn-danger'>Eliminar</a>";
}
function getArticulos() {
    var ruta = "/getArticulos";
    $.ajax({
        type: "GET",
        url: ruta,
        data: {},
        async: true,
        dataType: "json",
        success: function(data){
            //console.log(data);
            articulos = data;
            var inner = "";
            data.forEach(x => {
                inner += "<option value='" + x.codigo + "'>"+ x.nombre.trim() + " ---- " + x.descripcion.trim()+  " ---- " + x.unidad.trim()+"</option>";
            });
            articuloSelect.innerHTML = inner;
            
        }
    });
}
function deleteRow(event) {
    var row = event.currentTarget.parentElement.parentElement;
    var descriptionInput = row.children[1].firstElementChild;
    console.log(selectedIds);
    //console.log(descriptionInput.value);
    var id = parseInt(descriptionInput.getAttribute("current-id")); 
    /*var i = selectedIds.indexOf(id);
    var newAr = removeItemFromArray(selectedIds , i);
    selectedIds = [];
    selectedIds = newAr;
    console.log(selectedIds);*/
    tablaArticulos.deleteRow(row.rowIndex);
}
function removeItemFromArray(array, i) {    
       
    if (i > -1) {
       array.splice(i, 1);
    }
  
    return array; 
}
function guardarRequisicion(){
    if(document.getElementById('fecha-entrega').value==""){
        alert("Debes especificar una fecha de entrega");
        return 0;
    }
    var ruta = "/Requisicion/Guardar"
    var object = {
        'nombreUsuario': document.getElementById('tabla-articulos').getAttribute('nombre-usuario').toString(),
        'nombreEmpleado': document.getElementById('tabla-articulos').getAttribute('nombre-empleado').toString(),        
        'fechaPedido': new Date().toISOString().split("T")[0],
        'fechaEntrega': document.getElementById('fecha-entrega').value.toString(),
        'articulosReq' : []
    }
    var trs = tablaArticulos.querySelectorAll("tbody > tr");
    if(trs.length < 1){
        alert("Debes ingresar los articulos de la requisicion");
        return 0;
    }
    trs.forEach(element => {
        var articuloReq = {
            "articuloId":"",
            "cantidad":""
        }
        articuloReq["articuloId"] = parseInt(element.children[1].firstElementChild.getAttribute("current-id"));
        articuloReq["cantidad"] = parseInt(element.children[2].firstElementChild.value);
        object["articulosReq"].push(articuloReq);
    });
    console.log(object);
    
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
                alert("Requisicion Guardada con exito");
                window.location.href ="/";
            }
            
        }
    });
}