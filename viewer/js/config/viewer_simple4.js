
/*
 * 
 *   not working, because this use arcgis.js 3.15  vector tile have to be flat,
 *   now js 4.11, arcgis pro default vector tile package is 'index' missing tiles, need to use look up table. 
 *   
 *   so even, CMV works, it only works with mapbox version 'flat' tiles
 *   not work with current new js 4.11 supported 'index' tiles.
 *   
 *         
 * 
 * viewer_vector.js for vector tile server ( xxx/VectorTileServer )
 * https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Diverse_Index/VectorTileServer
 * 
 * vector sample url
 * https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services
 * 
 * 
 * 
 * 
   http://localhost:10/mapserver1/viewer/?config=viewer_vector&url=https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Diverse_Index/VectorTileServer&title=USA_Diverse_Index&zoom=14&lat=38.917292&long=-77.036420

   
    http://localhost:10/mapserver1/viewer/?config=viewer_vector
        &url=https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Diverse_Index/VectorTileServer
        &title=USA_Diverse_Index
        &zoom=14
        &lat=38.917292
        &long=-77.036420


         available parameters:
            
            zoom;
            lat;
            long;
            basemap;
            
            type;
            url;
            title;
            opacity;



 * 
 */




define([
   // 'esri/layers/VectorTileLayer',
    
    'esri/units',
    'esri/geometry/Extent',
    'esri/config',
    /*'esri/urlUtils',*/
    'esri/tasks/GeometryService',
    'esri/layers/ImageParameters',
    'gis/plugins/Google',
    'dojo/i18n!./nls/main',
    'dojo/topic',
    'dojo/sniff'
], function (/*VectorTileLayer,*/ units, Extent, esriConfig, /*urlUtils,*/ GeometryService, ImageParameters, GoogleMapsLoader, i18n, topic, has) {

    
    // https://developers.google.com/maps/documentation/javascript/get-api-key
    GoogleMapsLoader.KEY = 'xxxxxxxxxxxxx';

    
    var default_center_zoom = 12;
    var default_center_lat = 38.907292;
    var default_center_long = -77.036420;
    var default_basemap = 'streets';
    
    
    var  ___mapOption =  {
            basemap: default_basemap,
            center: [default_center_long, default_center_lat],
            zoom: default_center_zoom,
            sliderStyle: 'small'
        };
    
    
    
    
    //var default_type = 'dynamic';
    
   //  http://docs.cmv.io/en/latest/configure/operationalLayers/#layer-types 
   // var default_type = 'feature';
    
    //var default_url = 'https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer';
    //var default_url = '';
    
    //var default_title = 'Washington DC Zoning';
   // var default_title = '';
    
   // var default_opacity = 0.5;
    
   
    
    var ___operational_layer = 
            {
        
                     type: 'vectortile',
                    // title: 'State',
                    // url: "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Diverse_Index/VectorTileServer/resources/styles/root.json?f=json",
                   //  url: "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Diverse_Index/VectorTileServer",
                     options: {
                           id: 'vectortile111111',
                           opacity: 0.8,
                           visible: true
                       }
         
            }; // layers
            
            
            
       
           /*
           //  taken from this demo: https://github.com/ycabon/presentations/blob/gh-pages/2015-berlin-plenary/demos/3.15-vectortile/create-by-style-object.html
            type: 'vectortile',
            title: 'Custom Vector Style',
            options: {
                id: 'vectortile2',
                opacity: 1.0,
                visible: true,
                'glyphs': 'https://www.arcgis.com/sharing/rest/content/items/00cd8e843bae49b3a040423e5d65416b/resources/fonts/{fontstack}/{range}.pbf',
                'sprite': 'https://www.arcgis.com/sharing/rest/content/items/00cd8e843bae49b3a040423e5d65416b/resources/sprites/sprite',
                'version': 8,
                'sources': {
                    'esri': {
                       // 'url': 'https://basemapsdev.arcgis.com/arcgis/rest/services/World_Basemap/VectorTileServer',
                       //'url': 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Diverse_Index/VectorTileServer',
                       'url': 'http://localhost:10/tileserver/city/{z}/{x}/{y}.pbf',
                        'type': 'vector'
                    }
                },
                'layers': [{
                    'id': 'Land',
                    'type': 'fill',
                    'source': 'esri',
                    'source-layer': 'city_parcels',
                    'paint': {
                        'fill-color': '#273344'
                    },
                }]
            }
       
        




            type: 'vectortile',
            title: '',
            url: 'http://localhost:10/json2tree/js/datahub.io/mapbox/localhost_style.json',
            options: {
                id: 'vectortile1',
                opacity: 0.8,
                visible: true
            }
         */


         
    
    
    

    return {
        
        
        //-------------- dynamic loading url and center_zoom, center_lat, center_long ----------
        
        set_center_zoom: function(___zoom){
          
            ___mapOption.zoom = ___zoom;
            
        },
        
        
        set_center_long_lat: function(___long, ___lat ){
          
            ___mapOption.center = [___long, ___lat ];
            
        },
        
        
        
         set_basemap: function(___basemap ){
          
            ___mapOption.basemap = ___basemap;
            
        },
        
        
        
        set_type: function(___type ){
          
            ___operational_layer.type = ___type;
            
        },
        
        
        set_url: function(___url ){
          
            ___operational_layer.url = ___url;
            
        },
        
        set_title: function(___title ){
          
            ___operational_layer.title = ___title;
            
        },
        
        
        
        set_opacity: function(___opacity ){
          
            ___operational_layer.options.opacity = ___opacity;
            
        },
        
        
        
        
        get_center_zoom: function(){
            return ___mapOption.zoom;
        },
        
        get_mapOptions: function(){
            return ___mapOption;
        },
        
        get_operationalLayers: function(){
            return ___operational_layer;
        },
        //--------------------End  ------  dynamic loading url and center_zoom, center_lat, center_long ----------
        
        
        
        
        
        
        
        // used for debugging your app
        isDebug: true,

        //default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
        defaultMapClickMode: 'identify',
        // map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
        mapOptions: ___mapOption,

        

        // custom titles
        titles: {
            header: i18n.viewer.titles.header,
            subHeader: i18n.viewer.titles.subHeader,
            pageTitle: i18n.viewer.titles.pageTitle
        },

        layout: {
            
        },

        
        // operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
        // The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
        // 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
        operationalLayers: 
        [

              ___operational_layer

        ],








         // set include:true to load. For titlePane type set position the the desired order in the sidebar
        widgets: {

            layerControl: {
                include: true,
                id: 'layerControl',
                type: 'titlePane',
                path: 'gis/dijit/LayerControl',
                title: i18n.viewer.widgets.layerControl,
                iconClass: 'fa-th-list',
                open: true,
                position: 0,
                options: {

                    map: true,
                    
                    
                    layerControlLayerInfos: true,
                    
                    


                }
            },






            search: {
                include: true,
                type: 'domNode',
                path: 'esri/dijit/Search',
                srcNodeRef: 'geocoderButton',
                title: i18n.viewer.widgets.search,
                iconClass: 'fa-search',
                position: 0,
                options: {
                    map: true,
                    visible: true,
                    enableInfoWindow: false,
                    enableButtonMode:  true,
                    expanded:  false
                }
            },



            basemaps: {
                include: true,
                id: 'basemaps',
                type: 'domNode',
                path: 'gis/dijit/Basemaps',
                srcNodeRef: 'basemapsDijit',
                options: 'config/basemaps'
            },



            identify: {
                include: true,
                id: 'identify',
                type: 'titlePane',
                path: 'gis/dijit/Identify',
                title: i18n.viewer.widgets.identify,
                iconClass: 'fa-info-circle',
                open: false,
                preload: true,
                position: 3,
                options: 'config/identify'
            },


          

            legend: {
                include: true,
                id: 'legend',
                type: 'titlePane',
                path: 'gis/dijit/Legend',
                title: i18n.viewer.widgets.legend,
                iconClass: 'fa-picture-o',
                open: false,
                position: 1,
                options: {
                    map: true,
                    legendLayerInfos: true
                }
            }




        }
    };
});

