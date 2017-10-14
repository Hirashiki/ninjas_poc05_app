var geocoder;
function searchAddress() {
    geocoder = new google.maps.Geocoder();

    var addressInput = document.getElementById('address-input').value;

    var geocoder = new google.maps.Geocoder();
    converteEndereco(addressInput, map, geocoder);
}

function converteEndereco(endereco,mapa,geocoder) {
    geocoder.geocode({ 'address': endereco }, function (results, status) {
        if (status === 'OK') {
            console.log(results);
            mapa.setCenter(results[0].geometry.location);
            panorama.setPosition(results[0].geometry.location);
            //var marker = new google.maps.Marker({
            //    map: mapa,
            //    position: results[0].geometry.location
            //});
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}