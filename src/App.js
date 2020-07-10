import React, { Component } from "react"
import VTMap from "./VTMap"
import leafletPip from "@mapbox/leaflet-pip"
import L from "leaflet"
import borderData from "./border.js"

export class App extends Component {
  constructor() {
    super()

    this.state = {
      gameStarted: false,
      long: -72.7317,
      lat: 44.0886,
    }
  }

  randomLatLong = (minLat, maxLat, minLong, maxLong) => {
    console.log("inside latlong")
    let latCoords = (Math.random() * (45.005419 - 42.730315) + 42.730315)
    let longCoords = (Math.random() * (71.510225 - (73.352182)) + 73.352182) * -1
      console.log(longCoords)
      console.log(latCoords)

    return ({
      long: longCoords,
      lat: latCoords,
    })
  }
  
  placeMarker = (evt) => {
     console.log("inside place marker")
    let gjLayer = L.geoJSON(borderData)
    let point = this.randomLatLong()

    let results = leafletPip.pointInLayer(
      [point.long, point.lat],
      gjLayer
    )
    

    // let point = [this.state.long, this.state.lat]

    while (results.length < 1) {
      console.log("inside loop")
      point = this.randomLatLong()
      console.log(this.state.lat)
      console.log(this.state.long)
      results = leafletPip.pointInLayer([point.long, point.lat],gjLayer)
      console.log(results)
    }
    this.setState(point)
  }

  startButton = (evt) => {
    evt.preventDefault()
    this.setState({
      gameStarted: true,
    })
  }

  componentDidMount() {
    this.placeMarker()
  }

  render() {
    return (
      <div>
        <VTMap />
        <div>
          <button disabled={this.state.gameStarted} onClick={this.startButton}>
            Start Game
          </button>
          <button
            disabled={!this.state.gameStarted}
            onClick={this.giveUpButton}
          >
            Give Up
          </button>
          <button disabled={!this.state.gameStarted} onClick={this.guessButton}>
            Guess
          </button>
        </div>
      </div>
    )
  }
}

export default App
