import os,json
def get_sublayers_as_geojson(inpath,outpath):
    filelist=os.listdir(inpath)
    for filename in filelist:
        print filename
        with open(os.path.join(inpath,filename),"r") as f:
    
            roadfile= json.loads(f.read())
        for feature in roadfile['features']:
            if "name" in feature['properties'].keys():
                layername=feature['properties']['name'].replace(" ","").replace("_","").lower()
                print "Layer Type Name:" + layername
                
                if layername in ['existingroad','proposedroad','alternateroad']:
                    outputformat={"type":"FeatureCollection","features":[]}
                    outputformat['features'].append(feature)
                    with open(os.path.join(outpath,filename.rstrip(".geojson")+"-"+layername+".geojson"),"w") as f:
                        f.write(json.dumps(outputformat))
                #if layername in ['muckdisposal','plantation']:
					
            #if "description" in feature['properties'].keys():
            #    print "Description:" + feature['properties']['description']
            #print "________End of Layer___________\n"
        print "*****************End of File *****************\n\n"

def get_sublayers(inpath,outpath):
	filelist=os.listdir(inpath)
	for filename in filelist:
		print "******************************************************************\n"+ filename+"\n******************************************************************"
		with open(os.path.join(inpath,filename),"r") as f:
			roadfile= json.loads(f.read())
		pointlayers=[]
		polygons=[]
		linestrings=[]
		existingroads=[]
		alternateroads=[]
		proposedroads=[]
		muckdisposal=[]
		campa=[]
		for feature in roadfile['features']:
			#print feature.keys()
			featuretype = feature['geometry']['type']
			if featuretype=="Point":
				pointlayers.append(feature)
			if featuretype=="Polygon":
				polygons.append(feature)
			if featuretype=="LineString":
				linestrings.append(feature)
			#print feature['properties']
		#print "-----------------------------------------------------------------\nPoint Layers\n-----------------------------------------------------------------\n"
		for feature in pointlayers:
			if "name" in feature['properties'].keys():
				#print feature['geometry']['type']
				layername=feature['properties']['name']
				#print "Layer Type Name:" + layername
				if "plant" in layername.lower():
					campa.append(feature)
				else:
					muckdisposal.append(feature)
				
		#print "-----------------------------------------------------------------\nPolygons\n-----------------------------------------------------------------\n"
		for feature in polygons:
			if "name" in feature['properties'].keys():
				#print feature['geometry']['type']
				layername=feature['properties']['name']
		#		print "Layer Type Name:" + layername
				campa.append(feature)
		#print "-----------------------------------------------------------------\nLine Strings\n-----------------------------------------------------------------\n"
		for feature in linestrings:
			if "name" in feature['properties'].keys():
				#print feature['geometry']['type']
				layername=feature['properties']['name']
				#print "Layer Type Name:" + layername
				if "prop" in layername.lower():
					proposedroads.append(feature)
				elif "alt" in layername.lower():
					alternateroads.append(feature)
				else:
					existingroads.append(feature)
		print "-----------------------------------------------------------------\nExisting Roads\n-----------------------------------------------------------------\n"
		if len(existingroads)>0:		
			for layer in existingroads:
				print layer['properties']['name']
			outputformat={"type":"FeatureCollection","features":[]}
			outputformat['features']=existingroads
			with open(os.path.join(outpath,filename.rstrip(".geojson")+"-existingroads.geojson"),"w") as f:
				f.write(json.dumps(outputformat))
		
		print "-----------------------------------------------------------------\nAlternate Roads\n-----------------------------------------------------------------\n"
		if len(alternateroads)>0:		
			for layer in alternateroads:
				print layer['properties']['name']
			outputformat={"type":"FeatureCollection","features":[]}
			outputformat['features']=alternateroads
			with open(os.path.join(outpath,filename.rstrip(".geojson")+"-alternateroads.geojson"),"w") as f:
				f.write(json.dumps(outputformat))
		
		print "-----------------------------------------------------------------\nProposed Roads\n-----------------------------------------------------------------\n"
		if len(proposedroads)>0:		
			for layer in proposedroads:
				print layer['properties']['name']
			outputformat={"type":"FeatureCollection","features":[]}
			outputformat['features']=proposedroads
			with open(os.path.join(outpath,filename.rstrip(".geojson")+"-proposedroads.geojson"),"w") as f:
				f.write(json.dumps(outputformat))
		
		print "-----------------------------------------------------------------\nMuck Disposal Sites\n-----------------------------------------------------------------\n"			
		if len(muckdisposal)>0:		
			for layer in muckdisposal:
				print layer['properties']['name']
			outputformat={"type":"FeatureCollection","features":[]}
			outputformat['features']=muckdisposal
			with open(os.path.join(outpath,filename.rstrip(".geojson")+"-muckdisposal.geojson"),"w") as f:
				f.write(json.dumps(outputformat))
		
		print "-----------------------------------------------------------------\nCAMPA Sites\n-----------------------------------------------------------------\n"			
		if len(existingroads)>0:		
			for layer in campa:
				print layer['properties']['name']
			outputformat={"type":"FeatureCollection","features":[]}
			outputformat['features']=campa
			with open(os.path.join(outpath,filename.rstrip(".geojson")+"-campa.geojson"),"w") as f:
				f.write(json.dumps(outputformat))
		

