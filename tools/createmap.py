import os,sys


if __name__=="__main__":
    path=sys.argv[1]
    if not os.path.exists(os.path.join(path,"maps")):    
        os.mkdir(os.path.join(path,"maps"))
    if not os.path.exists(os.path.join(path,"maps","css")):        
        os.mkdir(os.path.join(path,"maps","css"))
    if not os.path.exists(os.path.join(path,"maps","js")):            
        os.mkdir(os.path.join(path,"maps","js"))
    if not os.path.exists(os.path.join(path,"maps","data")):        
        os.mkdir(os.path.join(path,"maps","data"))

    path_to_mojomaps=sys.argv[2]
    if not os.path.exists(os.path.join(path,"maps","js","mojomaps.js")):
        os.symlink(os.path.join(path_to_mojomaps,"web/js/mojomaps.js"),os.path.join(path,"maps","js","mojomaps.js"))
    if not os.path.exists(os.path.join(path,"maps","css","mojomaps.css")):
        os.symlink(os.path.join(path_to_mojomaps,"web/css/mojomaps.css"),os.path.join(path,"maps","css","mojomaps.css"))
    if not os.path.exists(os.path.join(path,"maps","css","style.css")):   
        os.symlink(os.path.join(path_to_mojomaps,"web/css/style.css"),os.path.join(path,"maps","css","style.css"))
    if not os.path.exists(os.path.join(path,"maps","leaflet")):
        os.symlink(os.path.join(path_to_mojomaps,"web/leaflet"),os.path.join(path,"maps","leaflet"))
