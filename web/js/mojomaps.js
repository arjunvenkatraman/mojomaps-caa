//Function to set up the MojoMap
//markerlayers=[]

/*function setupMojoMap(mapdiv,url,urltype="google"){


	log("Setting up the mojomap...")
	Tabletop.init( { key: url,
                   callback: setMapLayersFromGoogleDoc,
                   simpleSheet: true } )


}*/


function setupMojoMap(map,url,urltype){

	//console.log(lmap)
	log("Setting up the mojomap...")
	Tabletop.init( { key: url,
                   callback: function(data,tabletop){setMapLayersFromGoogleDoc(map,data,tabletop)},
                   simpleSheet: true } )


}


//Get different types of layer from GoogleSheet Data
function setMapLayersFromGoogleDoc(map,data,tabletop){
		log("Setting map layers from sheet")
		//console.log(lmap)
		baselayer=getBaseLayerGD(data)
		shapelayers=getShapeLayersGD(data)
		pointlayers=getPointLayersGD(data)
    //layercontrol = L.control.layers().addTo(map)

		layergroups={baselayers:{"Base Map":baselayer},overlays:{}}
		var options = {
					// Show a checkbox next to non-exclusive group labels for toggling all
					groupCheckboxes: true
		};

    for (var i=0;i<groupnames.length;i++){
          layergroups['overlays'][groupnames[i]]=L.layerGroup()
					//layercontrol.addOverlay(layergroups['overlays'][groupnames[i]],groupnames[i]);
    }
    //console.log(layergroups)
			layercontrol=L.control.groupedLayers().addTo(map);
    if (baselayer.display=="TRUE"){
		//map=addBaseMapLayer(mapdiv,baselayer)
			addBaseMapLayer(map,baselayer)
		}
		$(shapelayers).each(function(){
			if(this.display=="TRUE"){
				addShapeLayer(map,this.url,this.layername,this.groupname,this.style)
				//layercontrol.addOverlay(layergroups['overlays'])
			}
		});
		for (var i=0;i<groupnames.length;i++){
          layercontrol.addOverlay(layergroups['overlays'][groupnames[i]],groupnames[i]);
    }

		$(pointlayers).each(function(){
			if(this.display=="TRUE"){
				if (this.defaultmarker==""){
					this.defaultmarker="images/mojomapicon.png"
				}
				addPointLayerURL(map,this.url,this.defaultmarker,this.layername,this.callbackfuncname)
			}
		});
        //console.log(baselayers)
        //console.log(overlays)


}

//Get the base layer
function getBaseLayerGD(data){
    //console.log(data)
	for (row in data){
		if(data[row].layertype=="baselayer"){
			baselayer=data[row]

		}
	}
	return baselayer
}

//Get all the shape layers
function getShapeLayersGD(data){
	shapelayers=[]
	for (row in data){
		if(data[row].layertype=="shapelayer"){
			shapelayer=data[row]
			shapelayers.push(shapelayer)
		}
	}
	return shapelayers
}

//Get all the points layers
function getPointLayersGD(data){
	pointlayers=[]
	for (row in data){
		if(data[row].layertype=="pointlayer"){
			pointlayer=data[row]
			pointlayers.push(pointlayer)
		}
	}

	return pointlayers
}

//Add the base layer to the map
function addBaseMapLayer(map,basemaplayer){
		//var mymap = L.map(mapdiv).setView([basemaplayer.clat,basemaplayer.clong ], basemaplayer.zoom);
		map.setView([basemaplayer.clat,basemaplayer.clong ], basemaplayer.zoom);
		tilelayer=getTileLayer(basemaplayer.maptype)
		map.addLayer(tilelayer);
        //layercontrol.addBaseLayer(tilelayer,"Mapbox")
}

//Get the correct tile layer based on maptype
function getTileLayer(maptype){
	if (maptype=="osm"){
		tilelayer=getosmmap()
	}
	else if (maptype=="mapbox"){
		tilelayer=getmapboxmap('pk.eyJ1IjoiYXJqdW52ZW4iLCJhIjoiY2phN3ptODN4MDEzMTMybG8xM2t1bzltZCJ9.1HxRGkovlxUEqMNHlMmDmw')
	}
	return tilelayer
}

//Functions to get tile laters
function getosmmap(){ //add a tile layer to add to our map, in this case it's the 'standard' OpenStreetMap.org tile server
	log("Getting OSM map log")
	osmmap=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18
	})
	return osmmap
}

function getmapboxmap(accesstoken){ //add a tile layer to add to our map, in this case it's the MapBox tile server
	log("Getting mapbox tile layer")
	mapboxmap=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: accesstoken
	});
	return mapboxmap
}

//Functions to work with shape layers
/*
function addShapeLayer(map,featureCollection,layername){
	log("Adding shape layer " + layername)
	if(map==mapdiv){
		var svg = d3.select(map).append("svg")
		var g = svg.append("g")
		d3.json(featureCollection, function(error, collection) {
			var feature = g.selectAll("path")
							.data(collection.features)
							.enter().append("path")
							.attr("id",function(d){return d.properties.mojomapid});

		});
	}
	else{
		var svg = d3.select(map.getPanes().overlayPane).append("svg")
		var g = svg.append("g").attr("class", "leaflet-zoom-hide");

		d3.json(featureCollection, function(error, collection) {

			if (error) throw error;
			var transform = d3.geoTransform({point: projectPoint}),
				path = d3.geoPath().projection(transform);

			var feature = g.selectAll("path")
							.data(collection.features)
							.enter().append("path")
							.attr("class", "shape")
							.attr("id",function(d){return d.properties.mojomapid});

			map.on("moveend", reset);
			reset();
			// Reposition the SVG to cover the features.
			function reset() {

				var bounds = path.bounds(collection),
					topLeft = bounds[0],
					bottomRight = bounds[1];
				svg.attr("width", bottomRight[0] - topLeft[0])
					.attr("height", bottomRight[1] - topLeft[1])
					.style("left", topLeft[0] + "px")
					.style("top", topLeft[1] + "px");
				g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
				feature.attr("d", path);


			}

				// Use Leaflet to implement a D3 geometric transformation.
			function projectPoint(x, y) {
				var point = map.latLngToLayerPoint(new L.LatLng(y, x));
				this.stream.point(point.x, point.y);
			}

		});

	}
}
*/

function addShapeLayer(map,featureCollection,layername,layergroup,style){
	log("Adding shape layer " + layername)
	//console.log(featureCollection)
	$.ajax({
                  url: featureCollection,
                  beforeSend: function(xhr){
                    if (xhr.overrideMimeType)
                    {
                      xhr.overrideMimeType("application/json");
                    }
                  },
                  dataType: 'json',
                  data: null,
                  success:  function(data, textStatus, request) {
					           lstyle=JSON.parse(style)
					           //console.log(lstyle)
                               overlay=L.geoJson(data, { style: lstyle
						          });
                      overlay.addTo(map);
                      console.log(layergroups['overlays'][layergroup])
											if(layergroups['overlays'][layergroup]){
												layergroups['overlays'][layergroup].addLayer(overlay)
												

												//layercontrol.addOverlay(overlay,layername,layergroup);

											}

                  }
                });



}
//Functions to work with points layers


//Get points datafrom sheet and add to map
function addPointLayerURL(map,url,defaultmarker,layername,callbackfuncname="addPointLayer"){
	log("Adding points layer " + layername)
	if (callbackfuncname==""){
			callbackfuncname="addPointLayer"
	}
	log("Calling function " + callbackfuncname)
	Tabletop.init( { key: url,
                   callback: function(data,tabletop){window[callbackfuncname](map,defaultmarker,data,tabletop)},
                   simpleSheet: true } )


}




//Add a point layer to the map
function addPointLayer(map,defaultmarker,data,tabletop){

	featureCollection=getPointsAsGeoJson(data)
	if(map==mapdiv){
		//whattodoifnobaselayer
		console.log(map)
	}
	else
	{
			markerlayer=L.geoJson(featureCollection,
			{
				onEachFeature : function(feature,layer)
								{

									markers[feature['properties']['devname']]=layer
									devicon=L.divIcon({
												className : "icon-div",
												html: '<img src="'+defaultmarker+'" style="height: 30;width: 30;"/>'
												})
									layer.setIcon(devicon)
									//console.log(layer.id)

								}
				}).addTo(map)
			//console.log(map)
	}

	return markerlayer

}

//Convert points array from sheet into geojson
function getPointsAsGeoJson(data){
	points=[]
	for (row in data){
		template={
					"geometry" : {
						"type":"Point","coordinates":[]
						},
					"type" : "Feature",
					"properties" : {}
				}
		template['properties']=data[row]
		template['geometry']['coordinates']=[template['properties']['longitude'],template['properties']['latitude']]
		points.push(template)
	}
	return points
}


function log(message){
	var logdiv = document.getElementById('log');
	logdiv.innerHTML += "<br>"+ message;
}
