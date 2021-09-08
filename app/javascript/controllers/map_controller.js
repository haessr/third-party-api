import { Controller } from "stimulus";
// Excluding Mapbox GL JS explicitly from transpilation
import mapboxgl from "!mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import places from "places.js";
// import "mapbox-gl/dist/mapbox-gl.css";

export default class extends Controller {
  static targets = ["map"];

  connect() {
    this.initMapbox();
    // this.initAutocomplete()
    this.markers = [];
    this.map = null;
  }

  initMapbox() {
    if (this.mapTarget) {
      // only build a map if there's a div#map to inject into
      mapboxgl.accessToken = this.mapTarget.dataset.mapboxApiKey;
      this.markers = JSON.parse(this.mapTarget.dataset.markers);

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        zoom: 10, // starting zoom
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: "orange",
        },
        mapboxgl: mapboxgl,
      });

      this.map.addControl(geocoder);

      // const options = {
      //   container: document.querySelector("#address-input"),
      // };
      // places(options);

      this.map.on("click", (e) => {
        document.getElementById("info").innerHTML =
          // `e.point` is the x, y coordinates of the `mousemove` event
          // relative to the top-left corner of the map.
          JSON.stringify(e.point) +
          "<br />" +
          // `e.lngLat` is the longitude, latitude geographical position of the event.
          JSON.stringify(e.lngLat.wrap());
      });

      this.showMarkers();
      this.fitMapToMarkers();
      this.map.scrollZoom.disable();
    }
  }

  showMarkers() {
    this.markers.forEach((marker) => {
      const custom = document.createElement("div");
      custom.classList.add("custom-marker");
      new mapboxgl.Marker(custom)
        .setLngLat([marker.lng, marker.lat])
        .addTo(this.map);
    });
  }

  fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();
    this.markers.forEach((marker) => bounds.extend([marker.lng, marker.lat]));
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  }
}
