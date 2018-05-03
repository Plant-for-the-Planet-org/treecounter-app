var lastClick;

require([
  "esri/map",
  "esri/dijit/Search",
  "esri/dijit/LocateButton",
  "esri/tasks/locator",
  "dojo/on",
  "esri/tasks/AddressCandidate",
  "esri/geometry/Point",
  "esri/SpatialReference",
  "esri/Color",
  "esri/map",
  "esri/graphic",
  "esri/graphicsUtils",
  "esri/tasks/Geoprocessor",
  "esri/tasks/FeatureSet",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "dojo/domReady!",
  "esri/symbols/PictureMarkerSymbol"
], function (Map, Search, LocateButton, Locator, on, AddressCandidate, Point, SpatialReference, Color, Map, Graphic, graphicsUtils, Geoprocessor, FeatureSet, SimpleMarkerSymbol, SimpleLineSymbol,
             SimpleFillSymbol,PictureMarkerSymbol) {
  // initialize map, search icon and geolocalizazion-button
  var map = new Map("map", {
    basemap: "topo",
    center: [11.271, 47.904], // lon, lat
    zoom: 5
  });
  
  var spatialReference = new SpatialReference({wkid:4326});

  var redLine = new SimpleLineSymbol();
  redLine.setWidth(5);
  redLine.setColor(new Color([220, 101, 77, 0.7]));
  var redSymbol=new esri.symbol.PictureMarkerSymbol('https://user-images.githubusercontent.com/1295390/35769716-3d9ffe0e-08dd-11e8-8139-701a7dcc762e.png',32,32);
  var search = new Search({
    map: map,
    zoomScale: 15,
    showInfoWindowOnSelect: false,
    highlightGraphic: redSymbol
  }, "searchPlace");
  search.startup();
  var geoLocate = new LocateButton({
    map: map
  }, "LocateButton");
  geoLocate.startup();
  map.on("load", Marker);

  // initialize posibility to receive Position by clicking on Map
  var locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
  // receive Data from the different sources and work with them
  on(map, "click", function(evt) {
    locator.locationToAddress(evt.mapPoint, 100, geocodeClick, geocodeClickError);
    lastClick = evt.mapPoint;
  });
  on(search, "search-results", geocodeSearch);
  on(geoLocate, "locate", geocodeLocate);
  function geocodeSearch(candidate) {
    var resultCoordinates = candidate.results["0"][0].feature.geometry;
    var lat = resultCoordinates.getLatitude();
    var long = resultCoordinates.getLongitude();

    setLocation(long, lat);
  }
  function geocodeLocate(candidate) {
    map.setLevel(16);
    var lat = candidate.position.coords.latitude;
    var long = candidate.position.coords.longitude;
    setLocation(long, lat);
  }
  function geocodeClick(candidate) {
    var addressAsText = candidate.address.Match_addr;
    var lat = lastClick.getLatitude();
    var long = lastClick.getLongitude();
    setLocation(long, lat);
  }
  function geocodeClickError(error) {
    var lat = lastClick.getLatitude();
    var long = lastClick.getLongitude();
    var locationAsText = lat.toPrecision(6) + ", " + long.toPrecision(6);
    setLocation(long, lat);
  }
  function undefinedError(error) {
    // ToDo
  }
  function setLocation(long, lat) {
    // set form values
    console.log("latitude: "+lat);
    console.log("longitude: " +long);

    if ($('input[name=geoLongitude]').val() != undefined) {
      $('input[name=geoLongitude]').val(long);
    }

    if ($('input[name=geoLatitude]').val() != undefined) {
      $('input[name=geoLatitude]').val(lat);              
    }

    drawMarker(long, lat, redSymbol);
  }
  function drawMarker(long, lat, symbol) {
    map.graphics.clear();
    var inPoint = new Point(long, lat);
    var location = new Graphic(inPoint, symbol);
    map.graphics.add(location);
    fetch(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&location=${long},${lat}`)
    .then(response=>response.json())
    .then(res=>{
      if ($('input[name=country]').val() != undefined) {
        $('input[name=country]').val(res.address.CountryCode);              
      }
    })
    .catch(err=>console.log(err));
  }

    
  function Marker() {
    console.log("hi")
  //map.graphics.clear();
  var long=13.753910156249152;
  var lat=48.96428416088993;
  var symbol=redSymbol
  var inPoint = new Point(long, lat);
  var location = new Graphic(inPoint, redSymbol);
  map.graphics.add(location);
   long=12.753910156249152;
   lat=45.96428416088993;
    inPoint = new Point(long, lat);
    location = new Graphic(inPoint, redSymbol);
    map.graphics.add(location);
  
}
 
});