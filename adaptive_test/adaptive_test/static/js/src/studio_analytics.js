/* Javascript for StudioAnalyticsXBlock. */
function StudioAnalyticsXBlock(runtime, element) {
    document.querySelector(".showResults").addEventListener("click", showResults);
    // See load and submit funcions at python script
    var handlerUrlAnalytics = runtime.handlerUrl(element, 'load_analytics');
    

    // On document load
    $(function ($) {
        $.ajax({
            type: "POST",
            url: handlerUrlAnalytics,
            data: "null", // No return needed.
            dataType: 'json',
            success: function (data) {
                //add a header to the web page
                var header = '';
                header = '<div class="bg-primary  d-flex justify-content-center"> <h2 class="h1 text-white">Resultados Tests</h2> </div>'; 
                $("#analytics-header").append(header);
                //show database results (student id, date, test name and test result) in an HTML table 
                data.map((student) => {
                    var html = ''
                    /*if (student.test == 1) test_name = "Kolb"
                    if (student.test == 2) test_name = "Hermann"
                    if (student.test == 3) test_name = "Inteligencias Multiples"
                    if (student.test == 4) test_name = "Honey-Alonso"*/
                    if (student.test == 5) test_name = "Felder Silverman"

                    html += '<tr>'
                    html += '<td>' + student.user_id + '</td>'
                  //html += '<td>' + student.fecha + '</td>'
                    html += '<td>' + test_name + '</td>'
                    html += '<td>' + student.result.result + '</td>'
                    html += '</tr>'
                    $("#analytics-table").append(html);
                })
            }
        });
    });
        
    function showResults() {
        $.ajax({
            type: "POST",
            url: handlerUrlAnalytics,
            data: "null", // No return needed.
            dataType: 'json',
            success: function (data) {
                //show database results (student id, date, test name and test result) in an HTML table 
                let a=0,b=0,c=0,d=0,e=0,a2=0,b2=0,c2=0,d2=0,e2=0,a3=0,b3=0,c3=0,d3=0,e3=0,a4=0,b4=0,c4=0,d4=0,e4=0;

                data.map((student) => {

                    let  res = [] ;
                    for (let i=0; i<12 ; i++){
                        let x = student.result.result_details[i];
                        //let y = x.result;
                        res.push(x);
                    }

                                        
                    if (res[0]==0 || res[0]==1){
                            a++;
                        }
                    else if(res[0]==2 || res[0]==3){
                            b++;
                        }
                    else if (res[0]==4 || res[0]==5 || res[0]==6 || res[0]==7){
                            c++;
                        }
                    else if (res[0]==8 || res[0]==9){
                            d++;
                        }
                    else{
                        e++;
                    }

                    if (res[2]==0 || res[2]==1){
                        a2++;
                    }
                    else if(res[2]==2 || res[2]==3){
                        b2++;
                    }
                     else if (res[2]==4 || res[2]==5 || res[2]==6 || res[2]==7){
                        c2++;
                    }
                    else if (res[2]==8 || res[2]==9){
                        d2++;
                    }
                    else{
                        e2++;
                    }
                    
                    if (res[4]==0 || res[4]==1){
                        a3++;
                    }
                    else if(res[4]==2 || res[4]==3){
                        b3++;
                    }
                     else if (res[4]==4 || res[4]==5 || res[4]==6 || res[4]==7){
                        c3++;
                    }
                    else if (res[4]==8 || res[4]==9){
                        d3++;
                    }
                    else{
                        e3++;
                    }

                    if (res[6]==0 || res[6]==1){
                        a4++;
                    }
                    else if(res[6]==2 || res[6]==3){
                        b4++;
                    }
                     else if (res[6]==4 || res[6]==5 || res[6]==6 || res[6]==7){
                        c4++;
                    }
                    else if (res[6]==8 || res[6]==9){
                        d4++;
                    }
                    else{
                        e4++;
                    }




                    }

                    
                    
                )

                z = a + b + c + d + e ;
                z2 = a2 + b2 + c2 + d2 + e2;
                z3 = a3 + b3 + c3 + d3 + e3;
                z4 = a4 + b4 + c4 + d4 + e4;
                

                o = Math.floor(((a * 100) / z) * 100) / 100;
                p = Math.floor(((b * 100) / z) * 100) / 100;
                q = Math.floor(((c * 100) / z) * 100) / 100;
                r = Math.floor(((d * 100) / z) * 100) / 100;
                s = Math.floor(((e * 100) / z) * 100) / 100;

                o2 = Math.floor(((a2 * 100) / z2) * 100) / 100;
                p2 = Math.floor(((b2 * 100) / z2) * 100) / 100;
                q2 = Math.floor(((c2 * 100) / z2) * 100) / 100;
                r2 = Math.floor(((d2 * 100) / z2) * 100) / 100;
                s2 = Math.floor(((e2 * 100) / z2) * 100) / 100;

                o3 = Math.floor(((a3 * 100) / z3) * 100) / 100;
                p3 = Math.floor(((b3 * 100) / z3) * 100) / 100;
                q3 = Math.floor(((c3 * 100) / z3) * 100) / 100;
                r3 = Math.floor(((d3 * 100) / z3) * 100) / 100;
                s3 = Math.floor(((e3 * 100) / z3) * 100) / 100;

                o4 = Math.floor(((a4 * 100) / z4) * 100) / 100;
                p4 = Math.floor(((b4 * 100) / z4) * 100) / 100;
                q4 = Math.floor(((c4 * 100) / z4) * 100) / 100;
                r4 = Math.floor(((d4 * 100) / z4) * 100) / 100;
                s4 = Math.floor(((e4 * 100) / z4) * 100) / 100;
                
                var Chartgrafico = {
                type: "pie",
                data: {
                    datasets: [{
                    data: [o, p, q, r, s],
                    backgroundColor: [
                        '#034f84', '#92a8d1', '#d5f4e6',"#80ced6", "#618685",
                    ],
                    }],
                    labels: [
                    a+" Mucho más Reflexivo" , b+" Más Reflexivo", c+" Equilibrio", d+" Más Activo", e+" Mucho más Activo",
                    ]
                },
                options: {
                    responsive: true,
                }
                }

                var grafica = document.getElementById('grafico').getContext('2d');
                window.pie = new Chart(grafica, Chartgrafico);
                

                
                var Chartgrafico2 = {
                type: "pie",
                data: {
                    datasets: [{
                    label: 'Porcentaje',
                    data: [o2, p2, q2, r2, s2],
                    backgroundColor: [
                        '#4f3222', '#d4ac6e', '#dbceb0',"#bbab9b", "#7e4a35",
                    ],
                    }],
                    labels: [
                    a2+" Mucho más Intuitivo", b2+" Más Intuitivo", c2+" Equilibrio", d2+" Más Sensorial", e2+" Mucho más Sensorial",
                    ]
                },
                options: {
                    responsive: true,
                }
                }
                var grafica2 = document.getElementById('grafico2').getContext('2d');
                window.pie = new Chart(grafica2, Chartgrafico2);


                var Chartgrafico3 = {
                type: "pie",
                data: {
                    datasets: [{
                    data: [o3, p3, q3, r3, s3],
                    backgroundColor: [
                        "#c83349", "#e06377", "#ffeead", "#ffcc5c", "#feb236",
                    ],
                    }],
                    labels: [
                    a3+" Mucho más Verbal", b3+" Más Verbal", c3+" Equilibrio", d3+" Más Visual", e3+" Mucho más Visual",
                    ]
                },
                options: {
                    responsive: true,
                }
                }

                var grafica3 = document.getElementById('grafico3').getContext('2d');
                window.pie = new Chart(grafica3, Chartgrafico3);

                var Chartgrafico4 = {
                    
                    type: "pie",
                    data: {
                        datasets: [{
                        data: [o4, p4, q4, r4, s4],
                        backgroundColor: [
                            "#405d27", "#82b74b", "#e3eaa7", "#bdcebe", "#618685",
                        ],
                        }],
                        labels: [
                            a4+" Mucho más Global", b4+" Más Global", c4+" Equilibrio", d4+" Más Secuencial", e4+" Mucho más Secuencial",
                        ]
                    },
                    options: {
                        responsive: true,
                    }
                    }
    
                    var grafica4 = document.getElementById('grafico4').getContext('2d');
                    window.pie = new Chart(grafica4, Chartgrafico4);

                    var texto = "El Total de Estudiantes es: ";
                    var objetivo = document.getElementById('resultado');
                    objetivo.innerHTML = texto + z;
                                                
            }
        });
    }
}
