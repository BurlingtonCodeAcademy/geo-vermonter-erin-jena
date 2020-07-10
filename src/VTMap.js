import React from "react"
import { Map, TileLayer, Polygon, Marker } from "react-leaflet"
import borderData from "./border.js"
import L from "leaflet"


class VTMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      marker: this.props.marker
    }
  }

componentDidUpdate() {
  if(this.state.marker !== this.props.marker) {
    this.setState({marker: this.props.marker})
    
  }
}

  render() {
    console.log(this.props.marker)
    console.log(this.state.marker)
    let vtBorder = borderData.geometry.coordinates[0].map((coordSet) => {
      return [coordSet[1], coordSet[0]]
    })

    return (
      <Map id="map"
        center={[this.state.marker.lat, this.state.marker.long]}
        zoom={this.props.zoom}
        style={{
          height: "650px",
          width: "550px",
        }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <Marker position={[this.state.marker.lat, this.state.marker.long]} />
        <Polygon positions={vtBorder} />{" "}
      </Map>
    )
  }
}

export default VTMap
