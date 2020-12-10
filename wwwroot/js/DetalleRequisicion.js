var lineasProv = [];
var lineasCompra = [];
var ordenDeCompra ={
    numeroRequsicion : "",
    nombreUsuario : "",
    fechaPedido : "",
    fechaPago:"",
    terminosDeEntrega: "",
    lineasCompra: []
};
var tabla = document.querySelectorAll('table')[0];
//document.querySelectorAll("select").forEach(x =>{x.addEventListener('click', function(){console.log("hola")})});
function traerProveedores(id,event){
    if(lineasProv.includes(id)) return 0;
    lineasProv.push(id);
    var jsonPost = {
        'idArticulo':parseInt(id)
    }
    let select = event.currentTarget;
    select.disabled = true;
    var ruta = "/Requisicion/VerDetalles/Proveedores";
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: ruta,
        data: JSON.stringify(jsonPost),
        async: true,
        dataType: "json",
        success: function(data){
            console.log(data);
            var innerSelet = "";
            data.forEach(element => {
                innerSelet += "<option codigo-Producto='"+element["codigo"]+"' value='"+element["proveedor"]["nombreUsuario"]+"'>"+element["proveedor"]["nombreProveedor"] + "---"+element["precio"]+"</option>";
            });
            select.innerHTML += innerSelet;
            select.disabled = false;
        }
    });
}

function generarOrdenDeCompra() {
    var val = validar();
    if(val!=null){ alert(val); return 0;}
    console.log("Generando");
    var numeroRequsicion= parseInt(document.querySelectorAll('table')[0].getAttribute('id-requisicion'));
    var nombreUsuario = tabla.getAttribute('nombre-usuario');
    var fechaPedido = tabla.getAttribute('fecha-pedido');
    var fechaPago = document.getElementById("fechaPago").value;
    var terminosEntrega = document.getElementById("terminosEntrega").value;
    ordenDeCompra["numeroRequsicion"] = numeroRequsicion;
    ordenDeCompra["nombreUsuario"]= nombreUsuario.trim();
    ordenDeCompra["fechaPedido"] = fechaPedido;
    ordenDeCompra["fechaPago"] = fechaPago.toString().trim();
    ordenDeCompra["terminosDeEntrega"] = terminosEntrega.trim();
    var trs = document.querySelectorAll("tbody > tr");
    trs.forEach(tr => {
        var selectProveedor=tr.children[5].firstElementChild;
        var codigoProducto = parseInt(selectProveedor.selectedOptions[0].getAttribute('codigo-Producto'));
        var nombreUsuarioPRO = selectProveedor.value;
        var nombrePRO = selectProveedor.selectedOptions[0].innerHTML.split("---")[0];
        var precio = parseFloat(selectProveedor.selectedOptions[0].innerHTML.split("---")[1]);
        var cantidad = parseInt(tr.children[4].innerHTML);
        ordenDeCompra["lineasCompra"].push({
            codigoProducto : codigoProducto,
            nombreUsuarioPRO : nombreUsuarioPRO,
            nombrePRO : nombrePRO,
            cantidad : cantidad,
            precio:precio
        });
    });
    enviarOrden();
}
function enviarOrden(){
    var ruta = "/Requisicion/VerDetalles/Proveedores/guardarOrden"
    console.log(JSON.stringify(ordenDeCompra))
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: ruta,
        data: JSON.stringify(ordenDeCompra),
        async: true,
        dataType: "json",
        success: function(data){
            console.log(data);
            if(data){
                alert("Se a generado con exito y se ha enviado el correo a los proveedores")
            }      
            else{
                alert("A ocurrido un error, intente de nuevo")
            }
        

        }
    });
}

function validar(){
   var fecha =  document.getElementById("fechaPago");
   var terminos = document.getElementById("terminosEntrega");
   var selectflag = null;
   if(fecha.value == ""){
       return "Ingresa la fecha de pago"

   }
   if(terminos.value == ""){
       return "Ingresa los terminos de la entrega de pedido";
   }
   document.querySelectorAll("tr > td > select").forEach(
       x=>{
           if(x.selectedIndex < 1 ){
               selectflag = "No has seleccionado el proveedor de todos los articulos";
            }
        }
        );
    return selectflag;
        
}