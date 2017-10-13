//http://rcdevlabs.github.io/2015/02/20/google-maps-api-parte-4-manipulando-o-mapa-3d-satelite-zoom-opcoes/
//https://github.com/caitlinkuhlman/ObjectDetectionCLUtility
//Rua Guaianases, 1238 - Campos Elíseos
//São Paulo - SP, 01204-001
//-23.531652, -46.647055
//https://khms0.googleapis.com/kh?v=109&hl=pt-BR&deg=0&x=388412&y=574174&z=20
//https://khms0.googleapis.com/kh?v=109&hl=pt-BR&deg=0&x=388413&y=574174&z=20
//https://khms1.googleapis.com/kh?v=109&hl=pt-BR&deg=0&x=388413&y=574175&z=20
//https://khms1.googleapis.com/kh?v=109&hl=pt-BR&deg=0&x=388412&y=574175&z=20
//https://stackoverflow.com/questions/40361812/how-can-i-create-a-polygon-with-a-hole-inside-in-google-static-maps-api

//https://developers.google.com/maps/documentation/javascript/examples/streetview-events?hl=pt-br
var location1;
var map;
var map2;
var mapOptions;
var geocoder;
var panorama;
var markers = [];
var bermudaTriangle;
var cancelDraw=false;
var drawingManager;
function initMap() {
  location1 = {lat: -23.530780, lng: -46.649100};
  mapOptions = {
    zoom: 20,
    center: location1,
    mapTypeId: 'satellite',
    tilt: 45,streetViewControl:false,
    disableDefaultUI: true
  };

  mapOptionsPano = {
    zoom: 19,
    center: location1,
    mapTypeId: 'satellite',
    tilt: 0
  };
      // Create the map
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      map2 = new google.maps.Map(document.getElementById('mapPano'), mapOptionsPano);
      //,
      //streetViewControl:false,
      //disableDefaultUI: true
      //google.maps.event.addListener(map, 'click', function(e) {
      //  placeMarker(e.latLng, map);
      //});

      google.maps.event.addDomListener(document.getElementById('lixo1'), 'click', function() {

        var panoLat = panorama.getPosition().lat();
        var panoLng = panorama.getPosition().lng();
        var panoHeading =  panorama.getPov().heading;
        var panoPitch =  panorama.getPov().pitch;

        map.setOptions({
          streetViewControl:false,
          disableDefaultUI: true
        });
        var node = document.getElementById('map');
        
        domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

      });


      drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon']
        },
        markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        circleOptions: {
          fillColor: '#FFFFFF',
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1
        }
      });
      drawingManager.setMap(map);

      google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        console.log("antes1");
        drawingManager.setOptions({
          drawingControl: false
        });
        console.log("cancelDraw:" + cancelDraw);
        

        var triangleCoords = [];
        console.log('polygon path array', event.overlay.getPath().getArray());
        console.log(event.overlay.latLngs);
        $.each(event.overlay.getPath().getArray(), function(key, latlng){
          var lat = latlng.lat();
          var lng = latlng.lng();
          console.log(lat, lng);
          triangleCoords.push( new google.maps.LatLng( lat, lng));
        });


        var everythingElse = [
          new google.maps.LatLng(0, -90),
          new google.maps.LatLng(-90, -90),
          new google.maps.LatLng(-90, 0),
          new google.maps.LatLng(0, 0)
        ];

      
        bermudaTriangle = new google.maps.Polygon({
            paths: [triangleCoords,everythingElse],
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.0,
            strokeWeight: 2,
            fillColor: "#FFFFFF",
            fillOpacity: 1.00
        });
        bermudaTriangle.setMap(map);
        
        event.overlay.setMap(null);


      });
      




      geocoder = new google.maps.Geocoder();
      
      panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          position: location1,
          pov: {
            heading: 34,
            pitch: 10
          },
          linksControl: false
        });

        
      panorama.addListener('pano_changed', function() {
          //var panoCell = document.getElementById('pano-cell');
          //panoCell.innerHTML = panorama.getPano();
      });

      panorama.addListener('links_changed', function() {
          //var linksTable = document.getElementById('links_table');
          //while (linksTable.hasChildNodes()) {
         //  linksTable.removeChild(linksTable.lastChild);
          //}
          //var links = panorama.getLinks();
          //for (var i in links) {
          //  var row = document.createElement('tr');
          //  linksTable.appendChild(row);
         //   var labelCell = document.createElement('td');
          //  labelCell.innerHTML = '<b>Link: ' + i + '</b>';
          //  var valueCell = document.createElement('td');
          //  valueCell.innerHTML = links[i].description;
          //  linksTable.appendChild(labelCell);
          //  linksTable.appendChild(valueCell);
          //}
      });

      panorama.addListener('position_changed', function() {
        map.setCenter(panorama.getPosition());
        map2.setCenter(panorama.getPosition());
         // var positionCell = document.getElementById('position-cell');
         // positionCell.firstChild.nodeValue = panorama.getPosition() + '';
      });

      panorama.addListener('pov_changed', function() {
          //var headingCell = document.getElementById('heading-cell');
          //var pitchCell = document.getElementById('pitch-cell');
          //headingCell.firstChild.nodeValue = panorama.getPov().heading + '';
          //pitchCell.firstChild.nodeValue = panorama.getPov().pitch + '';
      });
    map.setStreetView(panorama);
    map2.setStreetView(panorama);
      
      //criaMarcador(location, map,geocoder);
      //converteEndereco("jose de campos novais, 115.", map ,geocoder);


      //var markers = locations.map(function(location, i) {
        //criaMarcador(location, map,geocoder);
      //});
}


var criaMarcador = function(marcador, mapa) {
    var posicao = new google.maps.LatLng(marcador.lat, marcador.lng);
    var opcoes = {
      position: posicao
      , title: "marcador.titulo"
      , animation: google.maps.Animation.DROP
      , map: mapa
    }
    var novoMarcador = new google.maps.Marker(opcoes);
    mapa.setCenter(novoMarcador.position)

  }

  function converteEndereco(endereco,mapa,geocoder) {

    geocoder.geocode({'address': endereco}, function(results, status) {
        if (status === 'OK') {
          console.log(results);
            mapa.setCenter(results[0].geometry.location);
            panorama.setPosition(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: mapa,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
  }

  function searchAddress() {
    
      var addressInput = document.getElementById('address-input').value;
    
      var geocoder = new google.maps.Geocoder();
      converteEndereco(addressInput, map ,geocoder);
    }


    function takePicture(){
      
      var largura = 800;
      var altura = 800;
      var lat = panorama.getPosition().lat();
      var lng = panorama.getPosition().lng();
      var heading = panorama.getPov().heading;
      var pitch = panorama.getPov().pitch;
      console.log("lat:" + lat);
      console.log("lng:" + lng);
      console.log("heading:" + heading);
      console.log("pitch:" + pitch);
      var link = "http://maps.googleapis.com/maps/api/streetview?size=" + largura + "x" + altura;
      var linkPanorama =  "&location=" + lat + "," + lng + "&heading=" + heading + "&pitch=" + pitch + "&sensor=true";
      document.getElementById('panorama-url').value = link + linkPanorama;
      console.log(link + linkPanorama);


      var link2 = "https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&zoom=20";
      var tamanho = "&tilt=45&size=" + largura + "x" + altura;
      var link45 =  "&center=" + lat + "," + lng + "&key=AIzaSyCVrl4dGbNf4u_Xr8pseeirTunBBqY-_go";
      document.getElementById('static-url').value = link2 + tamanho + link45;
      console.log(link2 + tamanho + link45);

      map.setOptions({streetViewControl: false});
      map.setOptions({disableDefaultUI: true});
      
      var node = document.getElementById('map');

      domtoimage.toPng(node)
      .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          document.body.appendChild(img);
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
    }

    function placeMarker(location) {
      var marker = new google.maps.Marker({
          position: location, 
          map: map
      });
      markers.push(marker);
  }


      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
        drawingManager.setMap(null);
      }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
          setMapOnAll(null);
          if(bermudaTriangle){
            bermudaTriangle.setMap(null);
          }
        }

        function setMapOnAll(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }
    
function createPolygon(){
  clearMarkers();
  var everythingElse = [
    new google.maps.LatLng(0, -90),
    new google.maps.LatLng(-90, -90),
    new google.maps.LatLng(-90, 0),
    new google.maps.LatLng(0, 0)
    
    
  ];
  
  var triangleCoords = [];
  for (var i = 0; i < markers.length; i++) {
    triangleCoords.push( new google.maps.LatLng( markers[i].getPosition().lat(), markers[i].getPosition().lng()));
  }

  bermudaTriangle = new google.maps.Polygon({
    paths: [everythingElse, triangleCoords],
    strokeColor: '#FFC107',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FFC107',
    fillOpacity: 0.35
  });

  bermudaTriangle.setMap(map);

}


function toggleStreetViewControl(b) {
  map.setOptions({
      streetViewControl:false,
      disableDefaultUI: false
  });
}