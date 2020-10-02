import React, { Component } from 'react';
import * as esriLoader from 'esri-loader';
import { debug } from '../../debug';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    const options = { url: 'https://js.arcgis.com/3.23/' };
    const modulesRequired = [
      'esri/map',
      'esri/dijit/Search',
      'esri/dijit/LocateButton',
      'esri/tasks/locator',
      'dojo/on',
      'esri/tasks/AddressCandidate',
      'esri/geometry/Point',
      'esri/SpatialReference',
      'esri/Color',
      'esri/graphic',
      'esri/graphicsUtils',
      'esri/tasks/Geoprocessor',
      'esri/tasks/FeatureSet',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/symbols/SimpleFillSymbol',
      'dojo/domReady!',
      'esri/symbols/PictureMarkerSymbol'
    ];
    esriLoader
      .loadModules(modulesRequired, options)
      .then(
        ([
          Map,
          Search,
          LocateButton,
          Locator,
          on,
          AddressCandidate,
          Point,
          SpatialReference,
          Color,
          Graphic,
          graphicsUtils,
          Geoprocessor,
          FeatureSet,
          SimpleMarkerSymbol,
          SimpleLineSymbol,
          SimpleFillSymbol,
          PictureMarkerSymbol
        ]) => {
          let lastClick;
          let mapThis = this;
          // Initialize map, search icon and geolocalizazion-button
          let map = new Map('mapNode', {
            basemap: 'topo',
            center: [11.271, 47.904], // lon, lat
            zoom: 5
          });

          let spatialReference = new SpatialReference({ wkid: 4326 });

          let redLine = new SimpleLineSymbol();
          redLine.setWidth(5);
          redLine.setColor(new Color([220, 101, 77, 0.7]));

          let redSymbol = new esri.symbol.PictureMarkerSymbol(
            'https://user-images.githubusercontent.com/1295390/35769716-3d9ffe0e-08dd-11e8-8139-701a7dcc762e.png',
            32,
            32
          );

          let search = new Search(
            {
              map: map,
              zoomScale: 15,
              showInfoWindowOnSelect: false,
              highlightGraphic: redSymbol
            },
            'searchPlace'
          );

          search.startup();

          let geoLocate = new LocateButton({ map: map }, 'LocateButton');
          geoLocate.startup();
          map.on('load', Marker);

          // initialize posibility to receive Position by clicking on Map
          let locator = new Locator(
            'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
          );
          // receive Data from the different sources and work with them
          on(map, 'click', evt => {
            locator.locationToAddress(
              evt.mapPoint,
              100,
              geocodeClick,
              geocodeClickError
            );
            lastClick = evt.mapPoint;
          });
          on(search, 'search-results', geocodeSearch);
          on(geoLocate, 'locate', geocodeLocate);
          function geocodeSearch(candidate) {
            let resultCoordinates = candidate.results['0'][0].feature.geometry;
            let lat = resultCoordinates.getLatitude();
            let long = resultCoordinates.getLongitude();

            setLocation(long, lat);
          }
          function geocodeLocate(candidate) {
            map.setLevel(16);
            let lat = candidate.position.coords.latitude;
            let long = candidate.position.coords.longitude;
            setLocation(long, lat);
          }
          function geocodeClick(candidate) {
            let addressAsText = candidate.address.Match_addr;
            let lat = lastClick.getLatitude();
            let long = lastClick.getLongitude();
            setLocation(long, lat);
          }
          function geocodeClickError(error) {
            let lat = lastClick.getLatitude();
            let long = lastClick.getLongitude();
            let locationAsText =
              lat.toPrecision(6) + ', ' + long.toPrecision(6);
            setLocation(long, lat);
          }

          function setLocation(long, lat) {
            // set form values
            //debug('latitude: ' + lat);
            //debug('longitude: ' + long);
            drawMarker(long, lat, redSymbol);
          }
          function drawMarker(long, lat, symbol) {
            map.graphics.clear();
            let inPoint = new Point(long, lat);
            let location = new Graphic(inPoint, symbol);
            map.graphics.add(location);

            fetch(
              `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&location=${long},${lat}`
            )
              .then(response => response.json())
              .then(res => {
                //debug('Selected country: ', res.address.CountryCode);
                mapThis.props.onMapsClick({
                  latitude: lat,
                  longitude: long,
                  country: res.address.CountryCode
                });
              })
              .catch(err => debug(err));
          }

          function Marker() {
            if (!mapThis.props.hasOwnProperty('pins')) return;

            //debug('Loading pins', mapThis.props);

            mapThis.props.pins.forEach(pin => {
              let symbol = new esri.symbol.PictureMarkerSymbol(
                `/client108/assets/icons/${pin.color}.png`,
                32,
                32
              );
              let inPoint = new Point(pin.long, pin.lat);
              let location = new Graphic(inPoint, symbol);
              map.graphics.add(location);
            });
          }
        }
      )
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <div
        id="mapNode"
        style={{ width: '100%', height: '500px', margin: 'auto' }}
      />
    );
  }
}
