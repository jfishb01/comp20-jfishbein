
var initLat = 42.330497742;
var initLng = -71.095794678;
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(initLat, initLng);
var mapOptions = {
	zoom: 12,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var meMarker;
var carmenMarker;
var waldoMarker;
var infowindow = new google.maps.InfoWindow();
var places;
var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var markers = [];
var infoWindows = new Array();
var t_icon = new google.maps.MarkerImage(
  "images/t_icon.png",
  null, 
  null, 
  new google.maps.Point(18, 18), //center the image
  new google.maps.Size(36, 36)); //image size
var waldo_icon = new google.maps.MarkerImage(
  "images/waldo.png",
  null,
  null,
  new google.maps.Point(20, 20),
  new google.maps.Size(40, 40));
var carmen_icon = new google.maps.MarkerImage(
  "images/carmen.png",
  null,
  null,
  new google.maps.Point(20, 20),
  new google.maps.Size(40, 40));

var stations = new Array();
stations[0] = {name:"Alewife", lat: 42.395428, lng: -71.142483,ID: "RALE"};
stations[1] = {name:"Davis", lat: 42.39674, lng: -71.121815,ID: "RDAV"};
stations[2] = {name:"Porter", lat: 42.3884, lng: -71.119149,ID: "RPOR"};
stations[3] = {name:"Harvard", lat: 42.373362, lng: -71.118956,ID: "RHAR"};
stations[4] = {name:"Central", lat: 42.365486, lng: -71.103802,ID: "RCEN"};
stations[5] = {name:"Kendall/MIT", lat: 42.36249079, lng: -71.08617653,ID: "RKEN"};
stations[6] = {name:"Charles MGH", lat: 42.361166, lng: -71.070628,ID: "RMGH"};
stations[7] = {name:"Park St.", lat: 42.35639457, lng: -71.0624242,ID: "RPRK"};
stations[8] = {name:"Downtown Crossing", lat: 42.355518, lng: -71.060225,ID: "RDTC"};
stations[9] = {name:"South Station", lat: 42.352271, lng: -71.055242,ID: "RSOU"};
stations[10] = {name:"Broadway", lat: 42.342622, lng: -71.056967,ID: "RBRO"};
stations[11] = {name:"Andrew Station", lat: 42.330154, lng: -71.057655,ID: "RAND"};
stations[12] = {name:"JFK/UMass Station", lat: 42.320685, lng: -71.052391,ID: "RJFK"};
stations[13] = {name:"North Quincy Station", lat: 42.275275, lng: -71.029583,ID: "RNQU"};
stations[14] = {name:"Wollaston Station", lat: 42.251809, lng: -71.005409,ID: "RWOL"};
stations[15] = {name:"Quincy Center Station", lat: 42.251809, lng: -71.005409,ID: "RQUC"};
stations[16] = {name:"Quincy Adams Station", lat: 42.233391, lng: -71.007153,ID: "RQUA"};
stations[17] = {name:"Braintree Station", lat: 42.2078543, lng: -71.0011385,ID: "RBRA"};
stations[18] = {name:"Savin Hill Station", lat: 42.31129, lng: -71.053331,ID: "RSAV"};
stations[19] = {name:"Fields Corner Station", lat: 42.300093, lng: -71.061667,ID: "RFIE"};
stations[20] = {name:"Shawmut Station", lat: 42.29312583, lng: -71.06573796,ID: "RSHA"};
stations[21] = {name:"Ashmont Station", lat: 42.284652, lng: -71.064489,ID: "RASH"};

function initialize() {
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  createRedLine();
  parseMBTA();
  getMyLocation();
}

function createRedLine() {
  for(var i = 0; i <= 21; i++) {
    createMarker(stations[i]);
    if(i < 12)
    {
      redStations.push(pt);
    }
    else if(i == 12)
    {
      redStations.push(pt);
      redBranchAshmont.push(pt);
      redBranchBraintree.push(pt);        
    }
    else if(i > 12 && i < 18)
    {
      redBranchBraintree.push(pt);        
    }
    else
    {
      redBranchAshmont.push(pt);      
    }
  }
  drawRedLine();
}

function drawRedLine() {
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

function parseMBTA() {
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
  request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
  request.send();
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200) {
      var results = JSON.parse(request.responseText);
      for (var i in stations) {
          getInfoContent(results, i);        
      }
    }
  }
}

function parseCnW() {
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
  request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
  request.send();
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200) {
      var results = JSON.parse(request.responseText);
      var count = 0;
      while(results[count] != undefined) {
        if(results[count]['name'] == 'Carmen Sandiego') {
          var carmenLat = results[count]['loc']['latitude'];
          var carmenLng = results[count]['loc']['longitude'];
          pt = new google.maps.LatLng(carmenLat, carmenLng);
          var marker = new google.maps.Marker({
            position: pt,
            map: map,
            title: 'Carmen Sandiego',
            icon: carmen_icon}); 
          carmenMarker = marker;
          google.maps.event.addListener(carmenMarker, 'click', function() {
            var carmenContent = 'Carmen&apos;s location is (' + carmenLat + ', ' + carmenLng + ')<br/>';
            carmenContent += 'Carmen Sandiego is ' + haversine(carmenMarker) + ' miles away.<br/>';
            infowindow.setContent(carmenContent);
            infowindow.open(map, carmenMarker);
          });
        }
        else if(results[count]['name'] == 'Waldo') {
          var waldoLat = results[count]['loc']['latitude'];
          var waldoLng = results[count]['loc']['longitude'];
          pt = new google.maps.LatLng(waldoLat, waldoLng);
          var marker = new google.maps.Marker({
            position: pt, 
            map: map,
            title: 'Waldo',
            icon: waldo_icon}); 
          waldoMarker = marker;
          google.maps.event.addListener(waldoMarker, 'click', function() {
            var waldoContent = 'Waldo&apos;s location is (' + waldoLat + ', ' + waldoLng + ')<br/>';
            waldoContent += 'Waldo is ' + haversine(waldoMarker) + ' miles away.<br/>';
            infowindow.setContent(waldoContent);
            infowindow.open(map, waldoMarker);
          });
        }
        count++;
      }
    }
  }
}

function getInfoContent(results, i) {
  var stopIDN = new String(stations[i].ID + "N");
  var stopIDS = new String(stations[i].ID + "S");
  var content = new String("<strong>" + markers[i].title + "</strong></br>");
  var count = 0;
  while (results[count] != undefined) {
    if(results[count]['PlatformKey'] == stopIDN)
    {
      content += "Northbound Arrival: " + results[count]['Time'] + '</br>';
    }
    else if(results[count]['PlatformKey'] == stopIDS)
    {
      content += "Southbound Arrival: " + results[count]['Time'] + '</br>';
    }
  count++;
  }
  addMarkerListener(markers[i], content);
}

function createMarker(t_stop) {
    pt = new google.maps.LatLng(t_stop.lat, t_stop.lng);
    var marker = new google.maps.Marker({       
        position: pt, 
        map: map,
        title: t_stop.name,
        icon: t_icon
    }); 
    markers.push(marker);
}

function addMarkerListener(marker, infoContent) {
    var infowindow = new google.maps.InfoWindow({
      content: infoContent
    });
    infoWindows.push(infowindow);
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

}

function getStationID(sName) {
  for(var i = 0; i <= 21; i++)
  {
    if(stations[i].name == sName) {  
    return stations[i].ID;
    }
  }
  return "";
}

function getMyLocation() {
  if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
	  navigator.geolocation.getCurrentPosition(function(position) {
      myLat = position.coords.latitude;
      myLng = position.coords.longitude;
      me = new google.maps.LatLng(myLat, myLng);
      meMarker =  new google.maps.Marker({position: me, title: "Me"});
      meMarker.setMap(map);
      map.panTo(me)
      renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap() {
	// Open info window on click of meMarker
	google.maps.event.addListener(meMarker, 'click', function() {
    content = 'My location is (' + myLat + ', ' + myLng + ')<br/>';
    infowindow.setContent(content);
	  infowindow.open(map, meMarker);
	});

	minDist = haversine(markers[0]);
  closestStation = markers[0].title;
  for (var m in markers) {
    curDist = haversine(markers[m]);
    if (curDist < minDist) {
      minDist = curDist;
      closestStation = markers[m].title;
    }
  }
    
  var info = document.getElementById('info');
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(info);
  var divContent = new String('Closest Station is ' + closestStation + '!</br>It is ' + minDist + ' miles away!<br/>');  
  info.innerHTML = divContent;
  parseCnW();
}
      
function haversine(obj) {

  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }

  var R = 6371/1.609344; // miles
  var lat1 = myLat;
  var lat2 = obj.position.lat();
  var lon1 = myLng;
  var lon2 = obj.position.lng();
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return (R * c);
}

