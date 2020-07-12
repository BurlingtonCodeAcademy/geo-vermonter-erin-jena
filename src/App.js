// importing everything needed
import React, { Component } from "react"
import VTMap from "./VTMap"
import leafletPip from "@mapbox/leaflet-pip"
import L from "leaflet"
import borderData from "./border.js"
import InfoBox from "./InfoBox.js"
import GuessModal from "./GuessModal.js"


// class App contains the contents to run our game
export class App extends Component {
    constructor(props) {
        super(props)
        // setting the state for the start of our game
        this.state = {
            gameStarted: false,
            long: '',
            lat: '',
            zoom: 8,
            marker: {
                lat: 43.85,
                long: -72.7317
            },
            guessButton: false,
            town: '?',
            county: '?',
            score: 100
        }
    }

    // function that is finding a random latitude and longitude given the min and max of each
    randomLatLong = (minLat, maxLat, minLong, maxLong) => {
        // console.log("inside latlong")
        let latCoords = Math.random() * (45.005419 - 42.730315) + 42.730315
        let longCoords = (Math.random() * (71.510225 - 73.352182) + 73.352182) * -1
        // console.log(longCoords)
        // console.log(latCoords)

        return {
            long: longCoords,
            lat: latCoords,
        }
    }

    // function that places a marker at the random latitude and longitude point
    placeMarker = () => {
        let gjLayer = L.geoJSON(borderData)
        let point = this.randomLatLong()
        console.log(point)
        let results = leafletPip.pointInLayer([point.long, point.lat], gjLayer)
        // loop that's making sure the random point is within vermont
        while (results.length < 1) {
            point = this.randomLatLong()
            results = leafletPip.pointInLayer([point.long, point.lat], gjLayer)
        }

        this.getGeoArea(point)

        this.setState({

            marker: point,
            lat: point.lat,
            long: point.long
        })

    }

    getGeoArea = (marker) => {
        let request = `https://nominatim.openstreetmap.org/reverse?lat=${marker.lat}&lon=${marker.long}&format=json`;
        console.log(request);
        fetch(request)
            .then((response) => response.json())
            .then((response) => {
                let townResult;
                townResult = response.address.town || response.address.city || response.address.village || response.address.hamlet
                console.log(townResult);
                let countyResult = response.address.county;
                console.log(countyResult);
                this.setState({
                    town: townResult,
                    county: countyResult
                })

            });
    }

    // the start button for the game
    startButton = (evt) => {

        this.setState({
            gameStarted: true,
            zoom: 18,
        })
        this.placeMarker()
    }

    // the guess button for the game
    guessButton = (evt) => {

        this.setState({
            guessButton: true
        })
    }

    handleGuess = (evt) => {
        console.log(evt.target.id)
        if (evt.target.id === 'close') {
            this.setState({
                guessButton: false
            })

        }
        let compareCounty = this.state.county.split(" ").join("-").toLowerCase()
      
        if (evt.target.id === compareCounty) {

            this.setState({
                victory: true
            })
            console.log(compareCounty)
        } else {
            this.setState((prevState) => {

               return {score: ((prevState.score) - 10)}

            })
        }
        

    }

    // the give up button for the game
    giveUpButton = (evt) => {

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
                {this.state.guessButton ? <GuessModal handleGuess={this.handleGuess} /> : false}
                {this.state.victory ? <h1>Congratulations! You win!</h1>: false}
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
                    lat={this.state.lat}
                    long={this.state.long}
                    town={this.state.town}
                    county={this.state.county}
                    gameStarted={this.state.gameStarted}
                />
            </div>

        )
    }
}

export default App
