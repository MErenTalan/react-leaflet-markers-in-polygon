# Installation
Use the package manager you want

```bash 
npm install react-leaflet-markers-in-polygon
```
# Using of polygonChecker function 

You will send an array that created by objects that includes id, lat and lng to PolygonChecker function.

Example :
```javascript
[
{
id: 1,
lat: 39.634872,
lng: 32.768745,
// ...You may have more data or not
},
{
id: 2,
lat: 38.746852,
lng: 32.134785,
// ...You may have more data or not
}
]
```
polygonChecker function will return list that contains leaflet id of polygon and included marker ids

# How to implement it

import  _delete and polygonChecker functions from "react-leaflet-markers-in-polygon"
add to EditControl's onChange and onDelete events the polygonChecker and _delete functions like this
```javascript
<EditControl
// Other stuff
onCreated={(e)=>{ polygonChecker( theMarkerArray ) }}
onDeleted={(e) => {
_deleted(e)
}}
// Other stuff
></EditControl>
```

# CONTACT
You're free to ask anything to me via merentalan@gmail.com 
