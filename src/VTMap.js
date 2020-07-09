import React from 'react'
import { Map, TileLayer, Polygon } from 'react-leaflet'
import borderData from './border.js'


class VTMap extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
       
        let vtBorder = borderData.geometry.coordinates[0].map(coordSet => {
            return [coordSet[1], coordSet[0]]
        })
        

        return (
       
            <Map center={[43.85, -72.7317]} zoom={8} style={{height: '650px', width: '550px'}}>
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' />

                <Polygon positions={vtBorder} />
            </Map>
            
        );


    }
}

export default VTMap

