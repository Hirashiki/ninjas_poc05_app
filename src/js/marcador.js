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