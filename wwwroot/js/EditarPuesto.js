var departamentosSelect = document.getElementById('newPermissionSelect');
var btnAceptarNuevoDepartamento = document.getElementById('Paceptar');
let tablaDepartamentos =document.getElementById("tabla-departamentos");
let trs = tablaDepartamentos.tBodies[0].children;
var oldDepartamentos = [];
let DepartamentosFinales = [];

btnAceptarNuevoDepartamento.addEventListener('click', function(){
    var currentID = parseInt(departamentosSelect.value);
    ////console.log(currentID);
    if(departamentosFinales.includes(currentID)) return 0;
    departamentosFinales.push(currentID);
    ////console.log(privilegiosFinales);
    var optionText = departamentosSelect.selectedOptions[0].innerText;
    var nombre = optionText.split('----')[0];
    introducirDepartamento(nombre, currentID);
});

function eliminar(event){
 var tr = event.currentTarget.parentElement.parentElement;
 var codigoToDelete= parseInt(tr.children[0].innerHTML);
 departamentosFinales = removeItemFromArray(departamentosFinales,departamentosFinales.indexOf(codigoToDelete));
 tablaDepartamentos.deleteRow(tr.rowIndex);
}

function introducirDepartamento(nombreDepartamento, id){
    
    var row = tablaDepartamentos.tBodies[0].insertRow(-1);
    var numero = row.insertCell(0);
    var nombre = row.insertCell(1);
    var btn_eliminar = row.insertCell(2);
    
    numero.scope = 'row';
    numero.innerHTML = id;
    nombre.innerHTML = nombreDepartamento;
    btn_eliminar.innerHTML = "<a onclick='eliminar(event)' class='btn btn-danger'>Eliminar</a>";
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
                inner += "<option value='" + x.codigo + "'>"+ x.nombre + "</option>";
                
            });
            for (let index = 0; index < trs.length; index++) {
                const element = trs[index];
                oldDepartamentos.push(parseInt(element.firstElementChild.innerHTML));
                
            }
            departamentosFinales = oldDepartamentos;
            departamentosSelect.innerHTML = inner;
            
        }
    });
}
function removeItemFromArray(array, i) {    
       
    if (i > -1) {
       array.splice(i, 1);
    }
  
    return array; 
}
function actualizarDepartamentos(){
    var jsonPost ={
        'idpuesto': parseInt(document.getElementById("tabla-privi").getAttribute('id-puesto')),
        'departamentosId':departamentosFinales
    }
    var ruta = "/Puesto/actualizarDepartamentos"
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: ruta,
        data: JSON.stringify(jsonPost),
        async: true,
        dataType: "json",
        success: function(data){
           console.log(data);
            
        }
    });
}
