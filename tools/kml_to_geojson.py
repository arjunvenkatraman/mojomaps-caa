# install togeojson from https://github.com/mapbox/togeojson before running this code
import os,sys
def kml_to_geojson(ipath,opath):
    for filename in os.listdir(ipath):
    	print filename
    	os.system("togeojson %s > %s" %(os.path.join(ipath,filename),os.path.join(opath,filename.rstrip(".kml")+".geojson")))
    #kml_list=os.listdir(filepath)
    '''
    only_names=[]
    for names in kml_list:
        name=os.path.splitext(os.path.basename(names))[0]
        only_names.append(name)
    print(only_names)
    for names in only_names:
        os.system("togeojson"+" "+filepath+"/"+names+".kml"+">"+" "+names+".geojson")
    '''
def clean_filenames(filepath):
    for filename in os.listdir(filepath):
        ipath=os.path.join(filepath,filename)
        opath=ipath.replace(" ","_")
        os.rename(ipath,opath)


'''
if __name__=="__main__":
    ipath=sys.argv[1]
    opath=sys.argv[2]
    clean_filenames(filepath)
'''    
