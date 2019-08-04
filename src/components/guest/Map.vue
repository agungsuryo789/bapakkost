<template>
  <div>
    <v-card class="demo-paper" :z-depth="3">
      <l-map style="height: 700px; width:100%;" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-geo-json :geojson="bicycleAndCampus.geojson" :options="bicycleAndCampus.options"></l-geo-json>
      </l-map>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue';
import { LMap, LTileLayer, LGeoJson,LCircle } from 'vue2-leaflet';
import PopupContent from './MapPopup';



var baseballIcon = L.icon({
  iconUrl: 'static/images/baseball-marker.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28]
});

function onEachFeature(feature, layer) {
    let popupContent = Vue.extend(PopupContent);
    let popup = new popupContent({ propsData: { type: feature.geometry.type, text: feature.properties.popupContent }});
    layer.bindPopup(popup.$mount().$el);

    //this methods kanggo hover open pop up
    layer.on('mouseover', function(event){
    layer.openPopup();
    })
}


export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LCircle
  },
    mounted(){
        var data = [
            {
                lat : -144.9998241,
                long : 39.7471494
            },
            {
                lat : -103.99982,
                long : 39.74714
            }
        ]
        for(var i=0;i<data.length;i++){
                var temp = {
                geometry: {
                    "type": "Point",
                    "coordinates": [
                        data[i].lat,
                        data[i].long
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal111!"
                },
                "id": 51
        }
            this.bicycleAndCampus.geojson.features.push(temp)
        }
        console.log(this.bicycleAndCampus.geojson.features)
    },
  data () {
    return {
      zoom: 13,
      center: [39.74739, -105],
      circle: {
        center: [39.74739, -105],
        radius: 100,
        color: 'red'
      },
      url:'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w',
      attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      bicycleAndCampus: {
        geojson: {
            "type": "FeatureCollection",
            "features": [
           
            ]
        },
        options: {
          style: function (feature) {
            return feature.properties && feature.properties.style;
          },
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 8,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          }
        }
      }
    }
  },
}
</script>


<style scoped>
.demo-paper{
 
}
</style>
