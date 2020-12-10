var select = document.getElementById("idRol");
let toDeleteRolId;
select.addEventListener('change',function(){
    console.log("Cambiando");
    
    toDeleteRolId = parseInt(select.value);
    console.log(toDeleteRolId);
});
function eliminar(){
    console.log(toDeleteRolId);
    var jsonPost ={
        'idrol': toDeleteRolId,
        'privilegiosId':[]
    }
    if(toDeleteRolId==0) return 0;
    var ruta = "/Rol/eliminarRol";
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