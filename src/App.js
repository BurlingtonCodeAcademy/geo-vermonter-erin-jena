import React, { Component } from 'react'
import VTMap from './VTMap'

export class App extends Component {
    constructor() {
        super()

        this.state = {
            
        }
    }

    startButton = (evt) => {
        evt.preventDefault()
        
        
    }

    render() {
        return (
            <div>
                <VTMap />
                <div>
                <button onClick={this.startButton}>Start Game</button>
                <button onclick={this.giveUpButton}>Give Up</button>
                <button onClick={this.guessButton}>Guess</button>
                </div>

            </div>

        )
    }
}

export default App
