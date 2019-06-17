function registrarEventos() {
    $(".detalles").on("click", mostrarDetalles);
    
}

function mostrarDetalles(e){
        e.preventDefault();
        let data = $(this).parents("tr").data("datos");
        $("#modalDetalles").find(".modal-title").text(data.nombre);
        let contenedor = $("#modalDetalles").find(".modal-body");
        contenedor.empty();
        contenedor.append("<b>Código: </b> " + data.id + "<br/>");
        contenedor.append("<b>Nombre: </b> " + data.nombre + "<br/>");
        contenedor.append("<b>Descripción: </b> " + data.descripcion + "<br/>");
        contenedor.append("<b>Valor: </b> " + parseFloat(data.valor).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "<br/>");
        contenedor.append("<b>Intensidad: </b> " + data.horas + "<br/>");
        contenedor.append("<b>Modalidad: </b> " + data.modalidad + "<br/>");

        $("#modalDetalles").modal("show");
}

$(function() {
    registrarEventos();
});

