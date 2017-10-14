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

    //map.setOptions({streetViewControl: false});
    //map.setOptions({disableDefaultUI: true});
    
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
