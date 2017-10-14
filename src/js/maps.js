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
function initMap() {
location1 = { lat: -23.530780, lng: -46.649100 };
  mapOptions = {
    zoom: 20,
    center: location1,
    mapTypeId: 'satellite',
    tilt: 45, streetViewControl: false,
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

  drawingManagerDecision();
  createPanorama();
  map.setStreetView(panorama);
  map2.setStreetView(panorama);
}