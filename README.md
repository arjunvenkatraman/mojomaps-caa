# Mojomaps
Maps combining data as layers on a google spreadsheet

## Development mode howto

### tools/createmap.py

This script should finally create a blank map for local development
This includes
1. Creating a folder for the new map
2. Copy over the mojomaps sample as is to the path, overwriting files 
..+ Can also be used for updates

Folder Structure for a Mojomap
------------------------------ 
```
< path to map >
|______mojomaps
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

To run the script
1. Clone this directory
2. Run the following commands
```
# cd <path to mojomap repo>
# python tools/createmap.py <pathtonewmap>
```
Viewing the map requires a web server to be installed.
```
# sudo apt install apache2
# sudo ln -s <path to new map> /var/www/html/<mapname>
```
The map will now be available in a browser at http://localhost/< mapname >

### Sample Mojomap spreadsheets

https://drive.google.com/drive/u/1/folders/1sWy5x1nbcOXa9tUUI_ob8z7qVVqqRv3a

To create your own, simply copy one of the sheets in the folder above to your drive. Make sure to publish the sheet to the web from the "File" menu. 

See tutorial here https://support.google.com/docs/answer/183965

### Making Changes

Once you have replicated the folder structure and linked mojomaps.html (or your filename of choice) to your spreadsheet, you can add and remove layers as rows in the spreadsheet. Anyone who has edit rights on the spreadsheet can also make those changes. Changes will be picked up by the map on refreshing the page. 

Some sample videos
------------------
1. How to turn visibility on and off for different layers  - https://www.youtube.com/watch?v=Sd3YFHkVxlk
2. How to adjust centering and zoom for the base layer - https://www.youtube.com/watch?v=UrVXHFmZsWs
3. How to make your own mojomap and add geojson layers - https://www.youtube.com/watch?v=SlQ_yQnvYOY
