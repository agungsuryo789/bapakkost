<template>
<div>
<v-app>
    <!-- navbar -->
    <navbar></navbar>
    <!-- Content -->
    <v-container fluid grid-list-md>
        <v-layout row wrap>
        <v-flex xs12 sm12 xl4 lg4 md4>
            <v-card dense flat floating color="orange lighten-1" >
                            <v-text-field 
                                solo-inverted
                                hide-details
                                prepend-inner-icon="search"
                                label="ketik alamat kos yang dicari"
                                append-icon="place"
                                justify-center 
                                v-model="textcari"
                            >
                            </v-text-field>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 xl4 lg4 md4>
            <v-btn color="red" @click="carikos()">cari</v-btn>
        </v-flex>
        </v-layout>
    </v-container>
    <v-flex xs12 sm12 fixed>
                    <v-card class="demo-paper" :z-depth="3">
                    <l-map style="height: 500px;" :zoom="zoom" :center="center">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-geo-json :geojson="bicycleAndCampus.geojson" :options="bicycleAndCampus.options"></l-geo-json>
                    </l-map>
                    </v-card>
    </v-flex>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
                <v-flex v-for="i in hasilCari" :key="i.IDkos" xs12 sm12 xl3 lg3 md3>
                        <v-layout>
                            <v-flex xs12>
                                <v-hover>
                                <v-card slot-scope="{ hover }"
                                    :class="`elevation-${hover ? 12 : 2}`"
                                    @click="gotoKos(i.IDkos)"
                                    >
                                    <v-card flat height="250px">
                                    <img v-bind:src="i.linkfoto" style="height:250px;">
                                    </v-card>
                                    <v-card flat height="150px">
                                    <v-flex font-weight-light two-line text-xs-left>
                                        {{i.Namakos}}<br>
                                        {{i.Tipekos}}<br>
                                        Rp {{i.NominalHarga}}<br>
                                        {{i.Tipeharga}}<br>
                                        {{i.Alamat}}
                                    </v-flex>
                                    </v-card>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                                </v-hover>
                            </v-flex>
                        </v-layout>
                </v-flex>
            <v-layout>
            </v-layout>
        </v-layout>
    </v-container>
</v-app>
</div>
</template>

<script>
import navbar from './Navbar.vue'
import Vue from 'vue';
import { LMap, LTileLayer, LGeoJson,LCircle,LMarker,LIcon } from 'vue2-leaflet';
import PopupContent from './MapPopup';

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
        LCircle,
        LMarker,
        LIcon,
        navbar
    },
    data () {
      return {
        textcari:'',
        tempat: this.$route.query.tempat,
        zoom: 13,
        markerLatLng: [this.$store.state.allkos[0].korlatkos, this.$store.state.allkos[0].korlongkos],
        dragable:true,
        center: [this.$store.state.allkos[0].korlatkos, this.$store.state.allkos[0].korlongkos],
        icon: L.icon({
            iconUrl: 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/67-512.png',
            iconSize: [50, 50],
            iconAnchor: [16, 37]
        }),
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
        },

        }
    },
    computed:{
        hasilCari(){
            return this.$store.state.allkos;            
        }
    },
    mounted(){
        this.$store.dispatch('cariKos',this.tempat)
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
        for(var i=0;i<this.$store.state.allkos.length;i++){
                var temp = {
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            this.$store.state.allkos[i].korlongkos,
                            this.$store.state.allkos[i].korlatkos
                        ]
                    },
                    "type": "Feature",
                    "properties": {
                        "popupContent": ""
                    },
                    "id": this.$store.state.allkos[i].IDkos
                }
            this.bicycleAndCampus.geojson.features.push(temp)
        }
        console.log(this.bicycleAndCampus.geojson.features)
    },
    methods:{
        gotoKos(id)
        {
            this.$router.push({ path: '/kos', query: { idkost: id }});
        },
        carikos(){
            this.$router.push({ path: '/cari' , query: { tempat: this.textcari }});
        }
    },
}
</script>

<style>

</style>
