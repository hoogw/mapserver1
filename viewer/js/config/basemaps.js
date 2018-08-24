define([
    'esri/dijit/Basemap',
    'esri/dijit/BasemapLayer',
    'dojo/i18n!./nls/main'
], function (Basemap, BasemapLayer, i18n) {

    return {
        map: true, // needs a reference to the map
        //mode: 'agol', // mut be either 'agol' or 'custom'

        /* optional starting basemap
        / otherwise uses the basemap from the map
        / must match one of the keys in basemaps object below
        */
        //mapStartBasemap: 'streets',

        /* optional array of  basemaps to show in menu.
        / otherwise uses keys in basemaps object below
        / values in array must match keys in basemaps object
        */
        //basemapsToShow: ['streets', 'satellite', 'hybrid', 'topo', 'lightGray', 'gray', 'national-geographic', 'osm', 'oceans'],

        // define all valid basemaps here.
        basemaps: {
            
            osm: {},
            hybrid: {},
            streets: {},
            
           

        }
    };
});