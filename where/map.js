var myLat = 42.330497742;
var myLng = -71.095794678;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var mapOptions = {
	zoom: 11, // The larger the zoom number, the bigger the zoom
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var meMarker;
var infowindow = new google.maps.InfoWindow();
var places;
var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var markers = [];
  
function initialize() {
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  getMyLocation();
  tico = new google.maps.MarkerImage(
    "images/t_icon.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(25, 25));
  meico = new google.maps.MarkerImage(
    "images/me.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(30, 30));
  
  pt = new google.maps.LatLng(42.395428, -71.142483);
	markers.push(new google.maps.Marker({position: pt, title: "Alewife Station", icon: tico}));
  redStations.push(pt);
  pt = new google.maps.LatLng(42.39674, -71.121815);
	markers.push(new google.maps.Marker({position: pt, title: "Davis Station", icon: tico}));
	redStations.push(pt); 
	pt = new google.maps.LatLng(42.3884, -71.119149);
	markers.push(new google.maps.Marker({position: pt, title: "Porter Square Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.373362, -71.118956);
	markers.push(new google.maps.Marker({position: pt, title: "Harvard Square Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.365486, -71.103802);
	markers.push(new google.maps.Marker({position: pt, title: "Central Square Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.36249079, -71.08617653);
	markers.push(new google.maps.Marker({position: pt, title: "Kendall/MIT Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.361166, -71.070628);
	markers.push(new google.maps.Marker({position: pt, title: "Charles/MGH Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.35639457, -71.0624242);
	markers.push(new google.maps.Marker({position: pt, title: "Park St. Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.355518, -71.060225);
	markers.push(new google.maps.Marker({position: pt, title: "Downtown Crossing Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.352271, -71.055242);
	markers.push(new google.maps.Marker({position: pt, title: "South Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.342622, -71.056967);
	markers.push(new google.maps.Marker({position: pt, title: "Broadway Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.330154, -71.057655);
	markers.push(new google.maps.Marker({position: pt, title: "Andrew Station", icon: tico}));
	redStations.push(pt);
	pt = new google.maps.LatLng(42.320685, -71.052391);
	markers.push(new google.maps.Marker({position: pt, title: "JFK/UMass Station", icon: tico}));
	redStations.push(pt);
  redBranchAshmont.push(pt);
	redBranchBraintree.push(pt);
  pt = new google.maps.LatLng(42.275275, -71.029583);
  markers.push(new google.maps.Marker({position: pt, title: "North Quincy Station", icon: tico}));
	redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.31129, -71.053331);
	markers.push(new google.maps.Marker({position: pt, title: "Savin Hill Station", icon: tico}));
	redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.300093, -71.061667);
	markers.push(new google.maps.Marker({position: pt, title: "Fields Corner Station", icon: tico}));
	redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.2665139, -71.0203369);
	markers.push(new google.maps.Marker({position: pt, title: "Wollaston Station", icon: tico}));
	redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.251809, -71.005409);
	markers.push(new google.maps.Marker({position: pt, title: "Quincy Center Station", icon: tico}));
	redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.29312583, -71.06573796);
	markers.push(new google.maps.Marker({position: pt, title: "Shawmut Station", icon: tico}));
	redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.233391, -71.007153);
	markers.push(new google.maps.Marker({position: pt, title: "Quincy Adams Station", icon: tico}));
	redBranchBraintree.push(pt);
	pt = new google.maps.LatLng(42.284652, -71.064489);
	markers.push(new google.maps.Marker({position: pt, title: "Ashmont Station", icon: tico}));
	redBranchAshmont.push(pt);
	pt = new google.maps.LatLng(42.2078543, -71.0011385);
	markers.push(new google.maps.Marker({position: pt, title: "Braintree Station", icon: tico}));
	redBranchBraintree.push(pt);
  pt = new google.maps.LatLng(myLat, myLng);
  console.log("location point: " + myLat + " " + myLng);
	meMarker =  new google.maps.Marker({position: pt, title: "Me", icon: meico});
  for (var m in markers) {
		markers[m].setMap(map);
		google.maps.event.addListener(markers[m], 'click', function() {
      console.log("in parse function");
      mvcObj = this;
      var request;

      try {
        request = new XMLHttpRequest();
      }
      catch (ms1) { // yes, exception handling is supported in JavaScript
        try {
          request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (ms2) {
          try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch (ex) {
            request = null;
          }
        }
      }
      if (request == null) {
        alert("Error creating request object --Ajax not supported?");
      }

      stopName = new String(this.title);
      pKey = "R" + stopName[0].toUpperCase() + stopName[1].toUpperCase() + stopName[2].toUpperCase() + "N";
      console.log(pKey);
    
      request.open("GET", "/mapper/station_schedule_all.json?PlatformKey=" + pKey, true);
      request.send();
      request.onreadystatechange = function(){
      if(request.readyState == 4) {
        results = JSON.parse(request.responseText);
        content = "<strong>" + this.title + "</strong>";
        console.log(results);
        if (results.length > 0) {
          content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
        }
        infowindow.setContent(content);
        infowindow.open(map, mvcObj);
        }
      }
    });
  }
  
  mvcObj = meMarker;
  meMarker.setMap(map);
  google.maps.event.addListener(meMarker, 'click', function() {
    console.log("I was clicked!");
    minDist = Math.sqrt(Math.pow(2,(myLat - markers[0].position.lat())) + Math.pow(2,(myLng - markers[0].position.lng())));
    closestStation = markers[0].title;
    for (var m in markers) {
      curDist = Math.sqrt(Math.pow(2,(myLat - markers[m].position.lat())) + Math.pow(2,(myLng - markers[m].position.lng())));
      if (curDist < minDist) {
        minDist = curDist;
        closestStation = markers[m].title;
      }
    }
    content = '<p id=Me> Closest Station is ' + closestStation + '!</p>';
    infowindow.setContent(content);
    infowindow.open(map, mvcObj);
  });
     
        // Render polylines (Red, Orange, and Blue)
		redLine = new google.maps.Polyline({
			path: redStations,
			strokeColor: "#DD0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLine.setMap(map);
		redLineAshmont = new google.maps.Polyline({
			path: redBranchAshmont,
			strokeColor: "#DD0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLineAshmont.setMap(map);
		redLineBraintree = new google.maps.Polyline({
			path: redBranchBraintree,
			strokeColor: "#DD0000",
			strokeOpacity: 1.0,
			strokeWeight: 5
		});
		redLineBraintree.setMap(map);
}

function getMyLocation()
{
  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
	  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("in get my location function: " + myLat + " " + myLng);
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
    console.log("in get my location function: " + myLat + " " + myLng);
		renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
  console.log(myLat + " " + myLng);
	// Update map and go there...
	map.panTo(me);

	// Create a meMarker
	meMarker = new google.maps.meMarker({
	  position: me,
		title: "Here I Am!"
	});
	meMarker.setMap(map);

	// Open info window on click of meMarker
	google.maps.event.addListener(meMarker, 'click', function() {
	  infowindow.setContent(meMarker.title);
	  infowindow.open(map, meMarker);
	});

	// Calling Google Places API
	var request = {
		location: me,
			radius: '500',
			types: ['food']
	};
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
}
      
function parse(stop) {
  console.log("in parse function");
	var request;

  try {
    request = new XMLHttpRequest();
  }
  catch (ms1) { // yes, exception handling is supported in JavaScript
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (ms2) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (ex) {
        request = null;
      }
    }
  }
  if (request == null) {
    alert("Error creating request object --Ajax not supported?");
  }

  request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json?stop_name=" + stop.title, true);
  request.send();
  console.log
  request.onreadystatechange = function(){
    if(request.readyState == 4) {
      results = JSON.parse(request.responseText);
      console.log(results);
			content = "<strong>" + stop.title + "</strong>";
      console.log(results);
			if (results.length > 0) {
			  content += '<table id="schedule"><tr><th>Trip</th><th>PlatformKey</th><th>TimeRemaining</th></tr></table>';
      }
      infowindow.setContent(content);
			infowindow.open(map, mvcObj);
    }
  }
}
