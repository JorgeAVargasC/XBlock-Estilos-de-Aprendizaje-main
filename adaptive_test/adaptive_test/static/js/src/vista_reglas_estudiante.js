/* Javascript for ReglasXBlock. */
function ReglasEstudiante(runtime, element) {
    var handlerUrl = runtime.handlerUrl(element, 'show_resources');
    var handlerUrlLoad = runtime.handlerUrl(element, 'load_test');

    $(function ($) {          

        var tag = ""

        $.ajax({
            type: "POST",
            url: handlerUrlLoad,
            data: "null",
            success: function (data) {
                window.test = data.test;
                
                if (data.test_result) {
                    var resultado = data.test_result.result
                    resultado = resultado.replace("<br>"," ").split(" ")

                    var dim1=resultado[11]
                    var dim2=resultado[15]
                    var dim3=resultado[2]
                    var dim4=resultado[7]

                    tag = dim1+"-"+dim2+"-"+dim3+"-"+dim4
                    tag = tag.toLowerCase()

                    var selector1 = document.getElementById("selector1")
                    var selector2 = document.getElementById("selector2")
                    var selector3 = document.getElementById("selector3")
                    var selector4 = document.getElementById("selector4")

                    selector1.innerText=dim1
                    selector2.innerText=dim2
                    selector3.innerText=dim3
                    selector4.innerText=dim4
                    
                    // Displays result
                    $("#resultados-test").append(tag)

                    var valores = [0,0,0,0,0,0,0,0]

                    resultados = data.test_result.result
                    resultados = resultados.replaceAll("Mucho mas","3 1")
                    resultados = resultados.replaceAll("Es mas","2 1")
                    resultados = resultados.replaceAll("Equilibrio entre","2 2")
                    resultados = resultados.replaceAll(" que "," ")
                    resultados = resultados.replaceAll(" y "," ")
                    resultados = resultados.split("<br>")

                    resultados.forEach(element => {
                        
                        variable = element.split(" ")

                        if(variable[2] == "Verbal"){
                            valores[0]=variable[0]
                            valores[4]=variable[1]
                        }else if(variable[3] == "Verbal"){
                            valores[0]=variable[1]
                            valores[4]=variable[0]
                        }
                        if(variable[2] == "Sensorial"){
                            valores[7]=variable[0]
                            valores[3]=variable[1]
                        }else if(variable[3] == "Sensorial"){
                            valores[7]=variable[1]
                            valores[3]=variable[0]
                        }
                        if(variable[2] == "Activo"){
                            valores[2]=variable[0]
                            valores[6]=variable[1]
                        }else if(variable[3] == "Activo"){
                            valores[2]=variable[1]
                            valores[6]=variable[0]
                        }
                        if(variable[2] == "Global"){
                            valores[5]=variable[0]
                            valores[1]=variable[1]
                        }else if(variable[3] == "Global"){
                            valores[5]=variable[1]
                            valores[1]=variable[0]
                        }
                    });

                    var valores_int = valores.map(function(x){
                        return parseInt(x,10);
                    });

                    $("#test").append('<p> Tu test ha revelado que eres: <br><b>' +data.test_result.result+'</p>')
                                   
                    var options = {
                        responsive: false,
                        maintainAspectRatio: true,
                        scale: {
                            max: 3,
                            min: 0,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    };

                    var dataLiteracy = {
                        labels: ['Verbal', 'Secuencial', 'Activo', 'Intuitivo', 'Visual', 'Global', 'Reflexivo', 'Sensorial'],
                        datasets: [{
                            label: "Resultados",
                            backgroundColor: "rgba(100,123,255,0.5)",
                            borderColor: "rgba(100,123,255,1)",
                            pointBackgroundColor: "rgba(179,181,198,1)",
                            pointBorderColor: "#0064ff",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgba(179,181,198,1)",
                            data: valores_int
                        }]
                    };

                    var ctx = document.getElementById("chart");
                    var myRadarChart = new Chart(ctx, {
                        type: 'radar',
                        data: dataLiteracy,
                        options: options
                    });


                }
            }
        });

        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: "null",
            dataType: 'json',
            success: function(data){
                setTimeout(function(){
                    var resources_list = document.getElementById('resources_allowed')
                    resources_list.innerHTML = ''

                    tag_estudiante = tag.split("-")

                    function validacion_tag(data_tag){
                        var data_tag_split = data_tag.split("-")
                        var validaciones=[false,false,false,false]

                        for (let i = 0; i < data_tag_split.length; i++) {
                            
                            if (data_tag_split[i] == tag_estudiante[i] || data_tag_split[i]=="ninguno") {
                                validaciones[i]=true
                            }                            
                        }
                        return validaciones.every(n => n == true )
                    }

                    //console.table(data)
                    resources_allowed = data.filter(resources => validacion_tag(resources.tag))
                    //console.log(resources_allowed);
                    var recursos=resources_allowed.map(item => "<br>"+item.resource)

                    resources_list.innerHTML = "Tus recursos están disponibles en: "+recursos
                },100)
                
            }
        });


    });
}