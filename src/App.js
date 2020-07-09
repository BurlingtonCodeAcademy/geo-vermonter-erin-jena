import React, { Component } from 'react'
import VTMap from './VTMap'

export class App extends Component {
    constructor() {
        super()

        this.state = {
          gameStarted: false,
          long: -72.7317,
          lat: 44.0886
        }
    }

    randomLatLong = (minLat, maxLat, minLong, maxLong) => {
      let latCoords = Math.random() * (45.005419 - 42.730315 + 1) + 42.730315);
      let longCoords = Math.random() * (-71.510225 - (-73.352182 + 1)) + (-73.352182);
      this.setState({
        long: longCoords,
        lat: latCoords
      })
    }
    
  startButton = (evt) => {
        evt.preventDefault()
        this.setState({
          gameStarted: true
    })
  }

  componentDidMount() {
    this.randomLatLong()
  }
    
  render() {
      console.log(this.state)
        return (
            <div>
                <VTMap />
                <div>
                <button disabled={this.state.gameStarted} onClick={this.startButton}>Start Game</button>
                <button disabled={!this.state.gameStarted} onclick={this.giveUpButton}>Give Up</button>
                <button disabled={!this.state.gameStarted} onClick={this.guessButton}>Guess</button>
                </div>

            </div>

        )
    }
}

export default App
