# Mojomaps
Maps combining data as layers on a google spreadsheet

##Development mode howto

tools/createmap.py
------------------
This script should finally create a blank map for local development
This includes
1. Creating a folder for the new map
2. Create a maps subfolder 
3. Create maps/css, maps/js, maps/icons, maps/data
4. Symlinking the mojomap libraries from the specified location
5. Copy over a sample mojomap html file
6. Optionally skip all of the above and use the cloud hosted versions of the js files

Folder Structure for a Mojomap
------------------------------
 
```
< path to map >
|______maps
        |_____js
        |      |
        |      |_____mojomaps.js
        |
        |_____css
        |      |_____mojomaps.css
        |      |_____style.css
        |
        |_____data
        |      |_____< geojson files go here >
        |
        |_____mojomap.html (contains key to drive spreadsheet definition for map)
```

Sample Mojomap spreadsheets
---------------------------
https://drive.google.com/drive/u/1/folders/1sWy5x1nbcOXa9tUUI_ob8z7qVVqqRv3a
To create your own, simply copy one of the sheets in the folder above to your drive. Make sure to publish the sheet to the web from the "File" menu. (See tutorial here [https://support.google.com/docs/answer/183965])
Making Changes
---------------------------
Once you have replicated the folder structure