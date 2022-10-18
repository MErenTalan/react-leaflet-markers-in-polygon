import React, { useState } from "react";
import * as turf from '@turf/turf'
const polygonInfo = []
const polygonRealData = [];
let activePolygonsAndMarkers = []
const deletedLayerIds = []

export const _deleted = (e)=>{
    for (const [key, value] of Object.entries(e.layers._layers)) {
        deletedLayerIds.push(key)
      }
      if (deletedLayerIds.length > 0) {
        console.log(deletedLayerIds);
        deletedLayerIds.map((deletedId) => {
          activePolygonsAndMarkers.map((item, index) => {
            if (+deletedId === item[0].id) {
              activePolygonsAndMarkers.splice(index, 1);
            }
          });
          polygonInfo.map((item, index) => {
            if (+deletedId === item[0].id) {
                polygonInfo.splice(index, 1);
            }
          });
        });
      }    
}
export const polygonChecker = (itemList,e)=>{
  activePolygonsAndMarkers = []
const polygonLatLngs = [];
    polygonLatLngs.push(e.layer.editing.latlngs[0][0]);
    polygonLatLngs[0].push(e.layer.editing.latlngs[0][0][0]);
   polygonInfo.push( [{ id: e.layer._leaflet_id }, polygonLatLngs])
    if (polygonInfo[0]) {
        if (polygonInfo[0][1][0].length > 2) {
          const pointsArray = [];
          itemList.map((item) => {
            pointsArray.push([item.lat,item.lng]);
          });
          polygonInfo.map((innerPolygonInfo) => {
            console.log(innerPolygonInfo);
            const toPolygonizeCoords = [];
            for (let i = 0; i < innerPolygonInfo[1][0].length; i++) {
              let point = innerPolygonInfo[1][0][i];
              toPolygonizeCoords.push([point.lat, point.lng]);
            }

            const searchWithin = turf.polygon([[...toPolygonizeCoords]]);

            const markerIDs = [];

            const markersIn = turf.pointsWithinPolygon(
              turf.points(pointsArray),
              searchWithin
            );

            if (markersIn.features[0]) {
              polygonRealData.push(markersIn.features[0].geometry.coordinates);
            }
            markersIn.features.map((markerInPolygon) => {
                itemList.map((item) => {
                if (
                  item.lat == markerInPolygon.geometry.coordinates[0] &&
                  item.lng == markerInPolygon.geometry.coordinates[1]
                ) {
                  markerIDs.push(item.id);
                }
              });
            });
            if (markerIDs.length > 0) {
              const uniqueMarkerIDs = [...new Set(markerIDs)];
              activePolygonsAndMarkers.push([
                innerPolygonInfo[0],
                uniqueMarkerIDs,
              ]);
            } else {
              activePolygonsAndMarkers.push([innerPolygonInfo[0], [null]]);
            }
          });
        }
      }
      return activePolygonsAndMarkers
}

