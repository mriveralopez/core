var privilegiosSelect = document.getElementById('newPermissionSelect');
var btnAceptarNuevoPrivilegio = document.getElementById('Paceptar');
let tablaPrivilegios =document.getElementById("tabla-privilegios");
let trs = tablaPrivilegios.tBodies[0].children;
var oldPrivilegios = [];
let privilegiosFinales = [];

btnAceptarNuevoPrivilegio.addEventListener('click', function(){
    var currentID = parseInt(privilegiosSelect.value);
    ////console.log(currentID);
    if(privilegiosFinales.includes(currentID)) return 0;
    privilegiosFinales.push(currentID);
    ////console.log(privilegiosFinales);
    var optionText = privilegiosSelect.selectedOptions[0].innerText;
    var nombre = optionText.split('----')[0];
    var desc = optionText.split('----')[1];
    introducirPrivilegio(nombre, desc, currentID);
});
function eliminar(event){
 var tr = event.currentTarget.parentElement.parentElement;
 var codigoToDelete= parseInt(tr.children[0].innerHTML);
 privilegiosFinales = removeItemFromArray(privilegiosFinales,privilegiosFinales.indexOf(codigoToDelete));
 tablaPrivilegios.deleteRow(tr.rowIndex);
}
function introducirPrivilegio(nombrePrivilegio,descripcion, id){
    
    var row = tablaPrivilegios.tBodies[0].insertRow(-1);
    var numero = row.insertCell(0);
    var nombre = row.insertCell(1);
    var descripcionPrivilegio = row.insertCell(2);
    var btn_eliminar = row.insertCell(3);
    
    numero.scope = 'row';
    numero.innerHTML = id;
    nombre.innerHTML = nombrePrivilegio;
    descripcionPrivilegio.innerHTML = descripcion;
    btn_eliminar.innerHTML = "<a onclick='eliminar(event)' class='btn btn-danger'>Eliminar</a>";
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
            for (let index = 0; index < trs.length; index++) {
                const element = trs[index];
                oldPrivilegios.push(parseInt(element.firstElementChild.innerHTML));
                
            }
            privilegiosFinales = oldPrivilegios;
            privilegiosSelect.innerHTML = inner;
            
        }
    });
}
function removeItemFromArray(array, i) {    
       
    if (i > -1) {
       array.splice(i, 1);
    }
  
    return array; 
}
function actualizarPrivilegios(){
    var jsonPost ={
        'idrol': parseInt(document.getElementById("tabla-privi").getAttribute('id-rol')),
        'privilegiosId':privilegiosFinales
    }
    var ruta = "/Rol/actualizarPrivilegios"
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: ruta,
        data: JSON.stringify(jsonPost),
        async: true,
        dataType: "json",
        success: function(data){
           console.log(data);
            if(data){
                alert("Se han guardado los cambios");
            }
            else{
                alert("Ha ocurrido un problema");
            }
            window.location.href = "/";
        }
    });
}

