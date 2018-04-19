/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var taulellWidth;
var taulellHeight;
var app = {
    // Application Constructor
    initialize: function () {
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        //Ejercicio 1
        $("#menBeeps").click(menBeeps);
        $("#masBeeps").click(masBeeps);

        //Ejercicio 2
        $("#esquerraFletxa").click(esquerraFletxa);
        $("#guardarFletxa").click(guardarFletxa);
        $("#dretaFletxa").click(dretaFletxa);

        //Ejercicio 4
        taulellWidth = $(document).width();
        taulellHeight = $(document).height();
        console.log(taulellWidth + " x " + taulellHeight);
        $('#ej4').append('<div class="btnGame" style="width:' + taulellWidth + 'px; height:' + taulellHeight + 'px; border:3px solid black; position:relative;"></div>');

        $("#start").click(start);


    }

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    /*onDeviceReady: function() {
     this.receivedEvent('deviceready');
     },
     
     // Update DOM on a Received Event
     receivedEvent: function(id) {
     var parentElement = document.getElementById(id);
     var listeningElement = parentElement.querySelector('.listening');
     var receivedElement = parentElement.querySelector('.received');
     
     listeningElement.setAttribute('style', 'display:none;');
     receivedElement.setAttribute('style', 'display:block;');
     
     console.log('Received Event: ' + id);
     }*/
};

app.initialize();
//Ejercicio 1
var contBeeps = 0;
function menBeeps() {
    if (contBeeps > 0 && contBeeps <= 5) {
        contBeeps--;
        $("#contBeeps").animate({left: "-=200"});
        $('#contBeeps').text("BEEPS " + contBeeps);
    }
}
function masBeeps() {
    if (contBeeps >= 0 && contBeeps < 5) {
        contBeeps++;
        $("#contBeeps").animate({left: '+=200'});
        $('#contBeeps').text("BEEPS " + contBeeps);

    }
}

//Ejercicio 2
var desviacio = 0;
var desviacioActual = 0;
var nord = 0;
function esquerraFletxa() {
    $("#fletxa").css({transform: "rotate(" + (desviacio - 10) + "deg)"});
    desviacio = desviacio - 10;
}
var watchID;
function guardarFletxa() {
    desviacioActual = desviacio;
    $("#fletxa").css({transform: "rotate(" + (desviacio - desviacio) + "deg)"});
    desviacio = 0;
    console.log(desviacioActual);
    //Ejercicio 3
    function onSuccess(heading) {
        nord = heading.magneticHeading;
        $("#desviacio").html(nord);
        nord = Math.floor(nord);


        if (nord == desviacioActual) {
            $("#missatge").html("CORRECTO");
            //Comprovar
            $("#guardarFletxa").click(function () {
                if (watchID) {
                    navigator.compass.clearWatch(watchID);
                }
                $("#fletxa").css({transform: "rotate(" + (desviacioActual) + "deg)"});

            });
        }
    }
    ;

    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    }
    ;
    var options = {
        frequency: 1000
    };

    watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

function dretaFletxa() {
    $("#fletxa").css({transform: "rotate(" + (desviacio + 10) + "deg)"});
    desviacio = desviacio + 10;
}

//Ejercicio 4
function start() {
    var quantityDiv = 0;
    var readyToPlay = true;
    var repeticio = 1;
    var eliminats = 0;
    $('.eliminats').text("Eliminats = " + eliminats);

    var id = setInterval(swapImages, 1000);
    function swapImages() {
        if (quantityDiv > 9 && readyToPlay == false && repeticio < 6) {
            alert("GameOver");
            clearInterval(id);
            quantityDiv = 0;
            repeticio = 0;
            readyToPlay = true;
        } else if (quantityDiv == 0 && readyToPlay == false) {
            alert("YOU WON");
            clearInterval(id);
            quantityDiv = 0;
            repeticio = 0;
            readyToPlay = true;
        } else {
            var i;
            for (i = 0; i < repeticio; i++) {
                var randomHeight = Math.floor(Math.random() * taulellHeight);
                var randomWidth = Math.floor(Math.random() * taulellWidth);
                var randomElement = Math.floor(Math.random() * 3 + 1);
                quantityDiv++;
                var elem = document.getElementById("myBar");

                elem.style.width = (quantityDiv * 10) + '%';
                $('#myBar').text(quantityDiv);

                $('.quantitat').text("Quantitat = " + quantityDiv);

                if (randomElement == 1) {
                    $('<button id="toHit" style="background: red; position: absolute; top:' + randomHeight + 'px; right:' + randomWidth + 'px " class="btn btn-danger">IMPACT</button>')
                            .appendTo('.btnGame').click(function () {
                        $(this).remove();
                        quantityDiv--;
                        eliminats++;
                        $('.eliminats').text("Eliminats = " + eliminats);
                    });
                } else if (randomElement == 2) {
                    $('<button id="toHit" style="background: black; position: absolute; top:' + randomHeight + 'px; right:' + randomWidth + 'px " class="btn btn-danger">IMPACT</button>')
                            .appendTo('.btnGame').click(function () {
                        alert("GameOver");
                        clearInterval(id);
                        $(".btnGame").empty();

                        return;
                    });
                } else if (randomElement == 3) {
                    $('<button id="toHit" style="background: green; position: absolute; top:' + randomHeight + 'px; right:' + randomWidth + 'px " class="btn btn-danger">IMPACT</button>')
                            .appendTo('.btnGame').click(function () {
                        $(".btnGame").empty();
                        eliminats = eliminats + quantityDiv;
                        $('.eliminats').text("Eliminats = " + eliminats);
                        quantityDiv = 0;
                        $('.quantitat').text("Quantitat = " + quantityDiv);


                    });
                }
            }
            readyToPlay = false;
            repeticio++;

        }
    }
}