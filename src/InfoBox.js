import React, { Component } from "react"

export class InfoBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTown: "",
      currentCounty: "",
    }
  }

  
  render() {
      console.log(this.props.town)
      console.log(this.props.county)
    return (
      <div
        style={{
          height: "150px",
          
        }}
      >
        <p>Town: {this.props.gameStarted ? "?" : this.props.town }</p>
        <p>County: {this.props.gameStarted ? "?" : this.props.county }</p>
        <p>Latitude: {this.props.gameStarted ? "?" : this.props.lat }</p>
        <p>Longitude: {this.props.gameStarted ? "?" : this.props.long }</p>
        <p>Score: {this.props.score}</p>
      </div>
    )
  }
}

export default InfoBox
