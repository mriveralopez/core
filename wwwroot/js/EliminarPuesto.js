var select = document.getElementById("idPuesto");
let toDeletePuestoId;
select.addEventListener('change',function(){
    console.log("Cambiando");
    
    toDeletePuestoId = parseInt(select.value);
    console.log(toDeletePuestoId);
});
function eliminar(){
    console.log(toDeletePuestoId);
    var jsonPost ={
        'idpuesto': toDeletePuestoId,
        'departamentosId':[]
    }
    if(toDeletePuestoId==0) return 0;
    var ruta = "/Puesto/eliminarPuesto";
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: ruta,
        data: JSON.stringify(jsonPost),
        async: true,
        dataType:'json',
        success: function(data){
           console.log(data);
            
        }
    });
}