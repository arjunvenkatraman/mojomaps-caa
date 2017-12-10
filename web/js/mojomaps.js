function getBaseLayerGD(data){
	for (row in data){
		if(data[row].layertype=="baselayer"){
			baselayer=data[row]
			
		}
	}
	return baselayer
}

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

function setMapLayersFromGoogleDoc(data){
		map=mapdiv
		
		//entry=data.feed.entry
		baselayer=getBaseLayerGD(data)
		shapelayers=getShapeLayersGD(data)
		if (baselayer.display=="TRUE"){
			map=addBaseMapLayer(mapdiv,baselayer)
		}
		console.log(map)
		$(shapelayers).each(function(){
			console.log(this)
			if(this.display=="TRUE"){
				addShapeLayer(map,this.url)
			}
		});
}


function setupMojoMap(mapdiv,url,urltype="google"){
	
	
	console.log(url)
	Tabletop.init( { key: url,
                   callback: setMapLayersFromGoogleDoc,
                   simpleSheet: true } )

}
		
//Functions to get tile laters
function getosmmap(){ //add a tile layer to add to our map, in this case it's the 'standard' OpenStreetMap.org tile server
		osmmap=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18
	})
	return osmmap
}
		
function getmapboxmap(){ //add a tile layer to add to our map, in this case it's the MapBox tile server
		mapboxmap=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiYXJqdW52ZW4iLCJhIjoiY2phN3ptODN4MDEzMTMybG8xM2t1bzltZCJ9.1HxRGkovlxUEqMNHlMmDmw'
	});
	return mapboxmap
}
		
//Selecting tile layer

function getTileLayer(maptype){
	if (maptype=="osm"){
		tilelayer=getosmmap()
	}
	else if (maptype=="mapbox"){
		tilelayer=getmapboxmap()
	}
	return tilelayer
}



function addBaseMapLayer(mapdiv,basemaplayer){
		//var mymap = L.map(maplayer).setView([25.509815,77.201317 ], 6);
		var mymap = L.map(mapdiv).setView([basemaplayer.clat,basemaplayer.clong ], basemaplayer.zoom);
		//Adding the selected tile layer
		//tilelayer.addTo(mymap);
		tilelayer=getTileLayer(basemaplayer.maptype)
		mymap.addLayer(tilelayer);
		return mymap
}



function addShapeLayer(map,featureCollection){
	if(map==mapdiv){
		var svg = d3.select(map).append("svg")
		var g = svg.append("g")
		d3.json(featureCollection, function(error, collection) {
			var feature = g.selectAll("path")
							.data(collection.features)
							.enter().append("path")
							.attr("id",function(d){console.log(d.properties);return d.properties.mojomapid});
			
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
							.attr("id",function(d){console.log(d.properties);return d.properties.mojomapid});
							
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
