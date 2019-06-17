
function registrarEventos() {
    $(".detalles").on("click", mostrarEstudiantes);
    $(".estado").on("click", cambiarEstado);
    $(document).on(".eliminarEstudiante", "click", eliminarEstudiante);
}

function mostrarEstudiantes(e) {
    e.preventDefault();
    let url = $(this).attr("href");
    let title = $(this).data("nombre");
    let cursoId = $(this).data("cursoid");
    $.ajax({
        url: url,
        success: function(data) {
            console.log("data", data);
            let filas = construirFilas(cursoId, data, url);

            $("#tablaEstudiantes tbody").html(filas);            
            $("#modalDetalles").find(".modal-title").text(title);
            $("#modalDetalles").modal("show");
        }
    });
}

function construirFilas(cursoId, data, url) {

    let filas = '';
            $.each(data, function(){
            
                filas += "<tr>" + 
                    "<td>" + this.identificacion + "</td>" +
                    "<td>" + this.nombre + "</td>" +
                    "<td>" + this.correo + "</td>" +
                    "<td>" + this.telefono + "</td>" +
                    "<td> <a class='eliminarEstudiante' href='/matriculas/eliminarEstudiante/" + this.identificacion + "/" + cursoId + "'" +
                          "data-url='"+ url + "' data-cursoid='"+ cursoId + "' title='Eliminar'><i class='fa fa-times' aria-hidden='true'></i></a></td>"
                    
            "</tr>"
            });
    return filas;
}

function cambiarEstado(e) {
    e.preventDefault();
    let url = $(this).attr("href");

    $.ajax({
        url: url,
        success: function() {
            window.location.reload(true);
        }
    });
}

function eliminarEstudiante(e) {
    e.stopPropagation();
    
    let urlEliminar = $(this).attr("href");
    let urlEstudiantes = $(this).data("url");
    let cursoId = $(this).data("cursoid");
    $.ajax({
        urlEliminar,
        success:function() {
            $.ajax({
                url: urlEstudiantes,
                success: function(data) {

                    let filas = construirFilas(cursoId, data, urlEstudiantes);
        
                    $("#tablaEstudiantes tbody").html(filas);            
                    $("#modalDetalles").modal("hide");                    
                    $("#modalDetalles").modal("show");
                }
            });
        }

    });

} 

$(function() {

    registrarEventos();
});