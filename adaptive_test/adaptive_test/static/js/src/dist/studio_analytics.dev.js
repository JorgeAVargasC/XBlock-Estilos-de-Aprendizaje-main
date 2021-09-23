"use strict";

/* Javascript for StudioAnalyticsXBlock. */
function StudioAnalyticsXBlock(runtime, element) {
  document.querySelector(".showResults").addEventListener("click", showResults); // See load and submit funcions at python script

  var handlerUrlAnalytics = runtime.handlerUrl(element, 'load_analytics'); // On document load

  $(function ($) {
    $.ajax({
      type: "POST",
      url: handlerUrlAnalytics,
      data: "null",
      // No return needed.
      dataType: 'json',
      success: function success(data) {
        //add a header to the web page
        var header = '';
        header = '<div class="bg-primary  d-flex justify-content-center"> <h2 class="h1 text-white">Resultados Tests</h2> </div>';
        $("#analytics-header").append(header); //show database results (student id, date, test name and test result) in an HTML table 

        data.map(function (student) {
          var html = '';
          
          /*if (student.test == 1) test_name = "Kolb"
          if (student.test == 2) test_name = "Hermann"
          if (student.test == 3) test_name = "Inteligencias Multiples"
          if (student.test == 4) test_name = "Honey-Alonso"*/

          if (student.test == 5) test_name = "Felder Silverman";
          html += '<tr>';
          html += '<td>' + student.user_id + '</td>'; //html += '<td>' + student.fecha + '</td>'

          html += '<td>' + student.result.result + '</td>';
          html += '<td>' + student.result.result + '</td>';
          html += '</tr>';
          $("#analytics-table").append(html);
        });
      }
    });
  });

  function showResults() {
    $.ajax({
      type: "POST",
      url: handlerUrlAnalytics,
      data: "null",
      // No return needed.
      dataType: 'json',
      success: function success(data) {
        //show database results (student id, date, test name and test result) in an HTML table 
        var a = 0,
            b = 0,
            c = 0,
            d = 0;
        data.map(function (student) {
          var res = student.result.result;
          var arr = res.split(' ', 1);
          var prueba1 = res.val.split("/n");
          document.write(prueba1);

          if ("Mas Reflexivo que Activo Mucho mas Intuitivo que Sensorial Mas Verbal que Visual Mas Global que Secuencial" == res) {
            a = a + 1;
          } else if ("Reflexivo" == res) {
            b = b + 1;
          } else if ("Teórico" == res) {
            c = c + 1;
          } else if ("Pragmático" == res) {
            d = d + 1;
          }
        });
        z = a + b + c + d;
        o = Math.floor(a * 100 / z * 100) / 100;
        p = Math.floor(b * 100 / z * 100) / 100;
        q = Math.floor(c * 100 / z * 100) / 100;
        r = Math.floor(d * 100 / z * 100) / 100;
        var Chartgrafico = {
          type: "pie",
          data: {
            datasets: [{
              data: [o, p, q, r],
              backgroundColor: ["red", "green", "blue", "yellow"]
            }],
            labels: [a, b, c, "Pragmático"]
          },
          options: {
            responsive: true
          }
        };
        var grafica = document.getElementById('grafico').getContext('2d');
        window.pie = new Chart(grafica, Chartgrafico);
        var Chartgrafico2 = {
          type: "pie",
          data: {
            datasets: [{
              label: 'Porcentaje',
              data: [o, p, q, r],
              backgroundColor: ["red", "green", "blue", "yellow"]
            }],
            labels: ["Activo", "Reflexivo", "Teórico", "Pragmático"]
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [{
                stacked: true,
                ticks: {
                  callback: function callback(value) {
                    return value + "%";
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: "Porcentaje"
                }
              }]
            }
          }
        };
        var grafica2 = document.getElementById('grafico2').getContext('2d');
        window.pie = new Chart(grafica2, Chartgrafico2);
      }
    });
  }
}