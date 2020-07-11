import React, { Component } from "react"
import VTMap from "./VTMap"
import leafletPip from "@mapbox/leaflet-pip"
import L from "leaflet"
import borderData from "./border.js"
import InfoBox from "./InfoBox.js"

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameStarted: false,
      long: -72.7317,
      lat: 44.0886,
      zoom: 8,
      marker: {
        lat: 43.85,
        long: -72.7317
      }
    }
  }

  randomLatLong = (minLat, maxLat, minLong, maxLong) => {
    console.log("inside latlong")
    let latCoords = Math.random() * (45.005419 - 42.730315) + 42.730315
    let longCoords = (Math.random() * (71.510225 - 73.352182) + 73.352182) * -1
    console.log(longCoords)
    console.log(latCoords)

    return {
      long: longCoords,
      lat: latCoords,
    }
  }

  placeMarker = () => {
    let gjLayer = L.geoJSON(borderData)
    let point = this.randomLatLong()

    let results = leafletPip.pointInLayer([point.long, point.lat], gjLayer)
    // let point = [this.state.long, this.state.lat]
    while (results.length < 1) {
      console.log("inside loop")
      point = this.randomLatLong()
      results = leafletPip.pointInLayer([point.long, point.lat], gjLayer)
    }
    this.setState({marker: point})
   
  }

  startButton = (evt) => {
    evt.preventDefault()
    this.setState({
      gameStarted: true,
      zoom: 18,
    })
    this.placeMarker()
  }

  guessButton = (evt) => {
      evt.preventDefault()
      this.setState({

      })
  }

  giveUpButton = (evt) => {
      evt.preventDefault()
      this.setState({
          gameStarted: false,
          zoom: 8

      })
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <VTMap marker={this.state.marker} zoom={this.state.zoom} />
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
        <InfoBox
        marker = {this.state.marker}
        gameStarted = {this.state.gameStarted}
        />
      </div>
    )
  }
}

export default App
