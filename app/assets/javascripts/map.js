function initialize(json) {
  var map = new L.Map('map');
  var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/5c71e56515a44dc0998bf0f8ea2c265f/997/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
  });

  var cloudmadeLayer = map.addLayer(cloudmade);

  // TODO: Segregate by date or something.
  var markers = [];
  var latLongs = [];
  for (var i = 0; i < json.length; i++) {
    var location = json[i];
    var latLong = new L.LatLng(location.latitude, location.longitude);
    var marker = new L.Marker(latLong);
    latLongs.push(latLong);
    markers.push(marker);
    map.addLayer(marker);
  }

  var polyline = new L.Polyline(latLongs, {
    color: 'red',
    opacity: .75,
    clickable: false,
    stroke: true
  });

  map.addLayer(polyline);

  cloudmadeLayer.setView(latLongs[0], 17);

  setInterval(function() {
    polyline.setStyle({color: "#" + HSVtoRGB(((+new Date) >> 2) % 360)});
  }, 10);
}

function HSVtoRGB(hue, saturation, value) {
  saturation = saturation || 1;
  value = value || 1;
  var chroma = value * saturation;
  var huePrime = hue / 60;
  var x = chroma * (1 - Math.abs(huePrime % 2 - 1));

  chroma = Math.floor(chroma * 255);
  x = Math.floor(x * 255);
  chroma = chroma.toString(16);
  if (chroma.length === 1) chroma = "0" + chroma;

  x = x.toString(16);
  if (x.length === 1) x = "0" + x;

  if (huePrime >= 0 && huePrime < 1) {
    return chroma + x + "00";
  } else if (huePrime >= 1 && huePrime < 2) {
    return x + chroma + "00";
  } else if (huePrime >= 2 && huePrime < 3) {
    return "00" + chroma + x;
  } else if (huePrime >= 3 && huePrime < 4) {
    return "00" + x + chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    return x + "00" + chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    return chroma + "00" + x;
  }
}
