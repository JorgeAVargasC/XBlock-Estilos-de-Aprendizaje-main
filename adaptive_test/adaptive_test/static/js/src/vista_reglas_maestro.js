/* Javascript for ReglasXBlock. */
function ReglasMaestro(runtime, element) {

    var handlerUrl = runtime.handlerUrl(element, 'tag_resource');

    $('#send', element).click(function(eventObject) {

        var file = document.getElementById("myfile").value

        var selector1 = document.getElementById("selector1")
        var selector2 = document.getElementById("selector2")
        var selector3 = document.getElementById("selector3")
        var selector4 = document.getElementById("selector4")

        var tag = "" 
        
        for(var i=0; i< selector1.length;i++){

            if (selector1[i].selected===true){
                var tag = tag + selector1[i].value + "-"
                console.log('btn clicked',tag);
            }
        }

        for(var i=0; i< selector2.length;i++){

            if (selector2[i].selected===true){
                var tag = tag + selector2[i].value + "-"
                console.log('btn clicked',tag);
            }
        }

        for(var i=0; i< selector3.length;i++){

            if (selector3[i].selected===true){
                var tag = tag + selector3[i].value + "-"
                console.log('btn clicked',tag);
            }
        }

        for(var i=0; i< selector4.length;i++){

            if (selector4[i].selected===true){
                var tag = tag + selector4[i].value
                console.log('btn clicked',tag);
            }
        }


        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({
                "tag": tag,
                "resource":file
        }),
            success: function(data){
                var showInfoResource = document.getElementById('info-resource')
                showInfoResource.innerHTML = ''
                showInfoResource.innerHTML =JSON.stringify(data.tag)

            }
        });
    });
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}

function agregarcontenido(a){
    tipoagregacion = a;
    var btn = document.getElementById("send")
    btn.removeAttribute("disabled")
    document.getElementById("tipo_contenido").innerHTML = "<h6 class='card-title mb-0' > Seleccionaste un PDF </h6>";
    if(tipoagregacion=="pdf"){
        codigo=''+        
    '<form class="d-flex mt-3 flex-wrap" id="estilo_aprendizaje" action=">'+
        '<label class="formFile mt-3 mb-1" for="myfile"> Archivo PDF: </label>'+
        '<input class="form-control mb-3" type="file" id="myfile" name="myfile">'+
                    
        '<div class="card me-3">'+
            '<div class="card-header text-white bg-primary">'+
                '<b class="m-0">Dimensión 1</b>'+
            '</div>'+
            '<div class="card-body border border-primary">'+
                '<select class="form-select" name="select_aprendizaje" id="selector1" >'+
                    '<option value="verbal" selected>Verbal</option>'+
                    '<option value="visual">Visual</option>'+
                    '<option value="ninguno"> Ninguno</option>'+
                '</select>'+
            '</div>'+
        '</div>'+
        
        '<div class="card me-3">'+
            '<div class="card-header text-white bg-primary">'+
                '<b class="m-0">Dimensión 2</b>'+
            '</div>'+
            '<div class="card-body border border-primary">'+
                '<select class="form-select" name="select_aprendizaje" id="selector2" >'+
                    '<option value="secuencial" >Secuencial</option>'+
                    '<option value="global">Global</option>'+
                    '<option value="ninguno" selected> Ninguno</option>'+
                '</select>'+
            '</div>'+
        '</div>'+
        
        '<div class="card me-3">'+
            '<div class="card-header text-white bg-primary">'+
                '<b class="m-0">Dimensión 3</b>'+
            '</div>'+
            '<div class="card-body border border-primary">'+
                '<select class="form-select" name="select_aprendizaje" id="selector3" >'+
                    '<option value="activo" >Activo</option>'+
                    '<option value="reflexivo">Reflexivo</option>'+
                    '<option value="ninguno" selected> Ninguno</option>'+
                '</select>'+
            '</div>'+
        '</div>'+
        
        '<div class="card me-3">'+
            '<div class="card-header text-white bg-primary">'+
                '<b class="m-0">Dimensión 4</b>'+
            '</div>'+
            '<div class="card-body border border-primary">'+
                '<select class="form-select" name="select_aprendizaje" id="selector4" >'+
                    '<option value="sensorial" >Sensorial</option>'+
                    '<option value="intuitivo">Intuitivo</option>'+
                    '<option value="ninguno" selected> Ninguno</option>'+
                '</select>'+
            '</div>'+
        '</div>'+                        
        '</form>'+
        '<p class="bd-callout bd-callout-warning mt-4 mb-1" id="nota-importante"><span>Nota:</span> Recuerda que debes escoger una etiqueta por cada dimensión.</p>';
        
        console.log(codigo)
        document.getElementById("agregarcontenido").innerHTML = codigo;
    }


}

document.getElementById("btnVistaEstudiante").addEventListener("click",function(){
    window.location.href="/scenario/adaptive_test.0/vista_reglas_estudiante/"+window.location.search;
});