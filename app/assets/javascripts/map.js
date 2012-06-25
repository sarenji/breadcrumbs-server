function initialize() {
  // initialize the map on the "map" div
  var map = new L.Map('map');

  // create a CloudMade tile layer (or use other provider of your choice)
  var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/5c71e56515a44dc0998bf0f8ea2c265f/997/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
  });

  // add the CloudMade layer to the map set the view to a given center and zoom
  var etsy = new L.LatLng(40.702963, -73.989850);
  map.addLayer(cloudmade).setView(etsy, 17);

  var other = new L.LatLng(40.735527, -73.982568);
  var other2 = new L.LatLng(40.734779, -73.983148);

  var marker = new L.Marker(etsy);
  map.addLayer(marker);
  map.addLayer(new L.Marker(other));

  var polyline = new L.Polyline([etsy, other2, other], {
    color: 'red',
    opacity: .75,
    clickable: false,
    stroke: true
  });
  map.addLayer(polyline);

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
