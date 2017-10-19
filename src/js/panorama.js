var panorama;

function createPanorama() {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: location1,
            pov: {
                heading: 34,
                pitch: 10
            },
            linksControl: false
        });


    panorama.addListener('pano_changed', function () {
        //var panoCell = document.getElementById('pano-cell');
        //panoCell.innerHTML = panorama.getPano();
    });

    panorama.addListener('links_changed', function () {
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

    panorama.addListener('position_changed', function () {
        map.setCenter(panorama.getPosition());
        map2.setCenter(panorama.getPosition());
        // var positionCell = document.getElementById('position-cell');
        // positionCell.firstChild.nodeValue = panorama.getPosition() + '';
    });

    panorama.addListener('pov_changed', function () {
        //var headingCell = document.getElementById('heading-cell');
        //var pitchCell = document.getElementById('pitch-cell');
        //headingCell.firstChild.nodeValue = panorama.getPov().heading + '';
        //pitchCell.firstChild.nodeValue = panorama.getPov().pitch + '';
    });
}