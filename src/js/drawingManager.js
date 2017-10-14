var drawingManager;
var bermudaTriangle;
var drawingManagerCriado = false;

function drawingManagerDecision(){

    if (drawingManagerCriado){
        document.getElementById('btnDrawing').innerHTML= "Desenho (Off)";
        console.log("deletar");
        deletarDrawingManager();
    }else{
        document.getElementById('btnDrawing').innerHTML= "Desenho (On)";
        console.log("criar");
        criarDrawingManager();
    }
}

function criarDrawingManager(){
    drawingManagerCriado = true;
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
}

function deletarDrawingManager() {
    drawingManagerCriado=false;
    if(bermudaTriangle){
        bermudaTriangle.setMap(null);
      }
    drawingManager.setMap(null);
  }