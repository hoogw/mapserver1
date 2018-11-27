define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Deferred'
], function (
    declare,
    lang,
    Deferred
) {

    return declare(null, {

        // the default name of the config file to load if ?config=configName
        // is not specified
        defaultConfig: 'viewer',
        loadConfig: function (wait) {

            // this will be used to make any inherited methods 'wait'
            var waitDeferred;

            if (wait) {
                waitDeferred = new Deferred();

                // if we need to wait for a previous deferred
                // wait for it,
                wait.then(lang.hitch(this, function () {

                    // load the config
                    this.initConfigAsync().then(lang.hitch(this, function () {

                        // do some stuff
                        this.initConfigSuccess(arguments);

                        // resolve
                        waitDeferred.resolve();
                    }),
                        lang.hitch(this, 'initConfigError')
                    );

                }));
            } else {

                waitDeferred = this.initConfigAsync();
                waitDeferred.then(
                    lang.hitch(this, 'initConfigSuccess'),
                    lang.hitch(this, 'initConfigError')
                );
            }
            // call any inherited methods or return a deferred
            return this.inherited(arguments, [waitDeferred]) || waitDeferred;
        },

        initConfigAsync: function () {
            var returnDeferred = new Deferred();
            // get the config file from the url if present
            var file = 'config/' + this.defaultConfig,
                s = window.location.search,
                q = s.match(/config=([^&]*)/i);
            
            
            if (q && q.length > 0) {
                file = q[1];
                if (file.indexOf('/') < 0) {
                    file = 'config/' + file;
                }
            }
            
            
            console.log(file);
            
            
            // ---------- dynamic parameters ----------
            
            
            
            
            var ___zoom;
            var ___lat;
            var ___long;
            var ___basemap;
            
            var ___type;
            var ___url;
            var ___title;
            var ___opacity;
            
            
            /*
             *  if (value) { 
             *     
             *  }
             * 
             * will evaluate to true if value is not:

                    null
                    undefined
                    NaN
                    empty string ("")
                    false
                    0
             * 
             * 
             * 
             */
            
            
            if ( location.search.match(/zoom=([^&]*)/i) )
            {
                 ___zoom = location.search.match(/zoom=([^&]*)/i)[1];
             }
            
            if ( location.search.match(/lat=([^&]*)/i) )
            {
               ___lat = location.search.match(/lat=([^&]*)/i)[1];
            }
            
            if (location.search.match(/long=([^&]*)/i))
            {
                ___long = location.search.match(/long=([^&]*)/i)[1];
            }
            
            if (location.search.match(/basemap=([^&]*)/i))
            {
                ___basemap = location.search.match(/basemap=([^&]*)/i)[1];
            }
            
            if (location.search.match(/type=([^&]*)/i))
            {
                ___type = location.search.match(/type=([^&]*)/i)[1];
            }
            
           if (location.search.match(/url=([^&]*)/i))
            {
                ___url = location.search.match(/url=([^&]*)/i)[1];
            }
            
            
            if (location.search.match(/title=([^&]*)/i))
            {
                ___title = location.search.match(/title=([^&]*)/i)[1];
            }
            
            if (location.search.match(/opacity=([^&]*)/i))
            {
                ___opacity = location.search.match(/opacity=([^&]*)/i)[1];
            }
            
            
            //console.log(location.search.match(/zoom=([^&]*)/i)[0]);   //    'zoom=17'
            //console.log(location.search.match(/zoom=([^&]*)/i)[1]);   //     '17'
            console.log(___zoom); 
            console.log(___lat); 
            console.log(___long); 
            console.log(___basemap); 
            
            console.log(___type); 
            console.log(___url); 
            console.log(___title); 
            console.log(___opacity); 
            
            
            
            
            // --------   End   ------- dynamic parameters ----------
            
            
            
            
            
            
            require([file], function (config) {
                 
                 
                // ******** both  ********* [1]  ********  [2] ************ works ************

                    //----------** [1]  ** ---- dynamic loading url and center_zoom, center_lat, center_long ----------
                       
                
                       //console.log(___zoom);
                       
                       if (___zoom && ___zoom.length > 0)
                       {
                        config.set_center_zoom(___zoom);
                       }
                       
                       if (___long && ___long.length > 0 && ___lat && ___lat.length > 0)
                       {
                         config.set_center_long_lat(___long, ___lat);
                       }  
                       
                       if (___basemap && ___basemap.length > 0)
                       {
                           config.set_basemap(___basemap);
                       }
                       
                       
                       if (___type && ___type.length > 0)
                       {
                           config.set_type(___type);
                       }
                       
                       if (___url && ___url.length > 0)
                       {
                         config.set_url(___url);
                       }  
                       
                       if (___title && ___title.length > 0)
                       {
                          
                          // fix bug
                          ___title = decodeURI(___title);
                          config.set_title(___title);
                       }
                       
                       if (___opacity && ___opacity.length > 0)
                       {
                           config.set_opacity(___opacity);
                        }
                       
                       //console.log(config.get_center_zoom());

                     // fix bug, cause error, due to regular original config does not have these function. must comoment out, 
                     //  console.log(config.get_mapOptions());
                     //  console.log(config.get_operationalLayers());
                      //-------End  --** [1]  ** ---------  dynamic loading url and center_zoom, center_lat, center_long ----------
               
               
               

                    returnDeferred.resolve(config);




            });      // require  
            
            
            
             
            
            
            
            return returnDeferred;
        },

        initConfigSuccess: function (config) {
            
                
            // ******** both  ********* [1]  ********  [2] ************ works ************
            
              
               
              //----------**  [2] **------- dynamic loading url and center_zoom, center_lat, center_long ----------
               
              // config.set_center_zoom();
              // console.log(config.get_mapOptions());
               
              //------------End  ----**  [2] **----  dynamic loading url and center_zoom, center_lat, center_long ----------
               
            
            
            
            
            this.config = config;
            if (config.isDebug) {
                window.app = this; //dev only
            }

            // setup the map click mode
            this.mapClickMode = {
                current: config.defaultMapClickMode,
                defaultMode: config.defaultMapClickMode
            };
            
            
            
            
            
            
        },

        initConfigError: function (err) {
            this.handleError({
                source: 'Controller',
                error: err
            });
        }
    });
});
