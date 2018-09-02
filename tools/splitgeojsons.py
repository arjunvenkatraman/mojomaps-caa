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
                if layername in ['existingroad','proposedroad','muckdisposal']:
                    outputformat={"type":"FeatureCollection","features":[]}
                    outputformat['features'].append(feature)
                    with open(os.path.join(outpath,filename.rstrip(".geojson")+"-"+layername+".geojson"),"w") as f:
                        f.write(json.dumps(outputformat))
            #if "description" in feature['properties'].keys():
            #    print "Description:" + feature['properties']['description']
            #print "________End of Layer___________\n"
        print "*****************End of File *****************\n\n"

