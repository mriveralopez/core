var municipiosSelect = document.getElementById("municipio");
document.getElementById("departamento").addEventListener("change", function(){
    var id = parseInt(this.value);
    if(id<0) return 0;
    municipiosPorDepartamento(id);
    municipiosSelect.disabled = false;
});

function municipiosPorDepartamento(id){
    if(id == null) return alert ("era null");
    var object = {
        "idMunicipio": id
    }
    var ruta = "/Empleado/municipio";
    $.ajax({
        type: "POST",
        url: ruta,
        contentType: 'application/json',
        data: JSON.stringify(object),
        async: true,
        dataType: "json",
        success: function(data){
            
            var innerString = " ";
            municipiosSelect.innerHTML = innerString;
            data.forEach(municipo => {
                innerString += "<option value='"+ municipo["codigo"]+"'>"+municipo["nombre"]+"</option>";
            });

            municipiosSelect.innerHTML = innerString;
            console.log(data);
        
            
        }
});
}