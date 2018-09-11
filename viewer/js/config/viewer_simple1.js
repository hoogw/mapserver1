/*
 * sample url
 * 
   http://localhost:10/mapserver1/viewer/?config=viewer_simple1&url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer&title=Washington_DC_Zoning&zoom=14&lat=38.917292&long=-77.036420

   
    http://localhost:10/mapserver1/viewer/?config=viewer_simple1
        &url=https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer
        &title=Washington_DC_Zoning
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
], function (units, Extent, esriConfig, /*urlUtils,*/ GeometryService, ImageParameters, GoogleMapsLoader, i18n, topic, has) {

    
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
    
    
    
    
    var default_type = 'dynamic';
    
    //var default_url = 'https://maps2.dcgis.dc.gov/dcgis/rest/services/Zoning/MapServer';
    var default_url = '';
    
    //var default_title = 'Washington DC Zoning';
    var default_title = '';
    
    var default_opacity = 0.5;
    
    
    var ___operational_layer = {
                type: default_type,
                //type: 'feature',
                url: default_url,
                title: default_title,
                
                options: {
                
                opacity: default_opacity
                },
                
                
                
                layerControlLayerInfos: {
            
                    // layer control options
                    noLegend: false,
                    noZoom: false,
                    swipe: true,
                    swipeScope: true,
                    expanded: true,
                    sublayers: true,
                    metadataUrl: false,
                    allSublayerToggles	: true,
                   
                }



            };
    
    
    

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
            },



            




        }
    };
});

