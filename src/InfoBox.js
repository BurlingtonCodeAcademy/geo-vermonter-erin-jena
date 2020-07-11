import React, { Component } from 'react'


export class InfoBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTown: "",
            currentCounty: ""

        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.marker);
        if (prevProps.marker !== this.props.marker) {
            this.getGeoArea(this.props.marker)
                .then((response) => {
                    this.setState({
                        currentTown: response[0],
                        currentCounty: response[1]
                    })
                })
        }
    }


    getGeoArea = (marker) => {
        let request = `https://nominatim.openstreetmap.org/reverse?lat=${marker.lat}&lon=${marker.long}&format=json`;
        console.log(request);
        return fetch(request)
            .then((response) => response.json())
            .then((response) => {
                let townResult;

                townResult = response.address.town || response.address.city || response.address.village || response.address.hamlet

                console.log(townResult);
                let countyResult = response.address.county;
                console.log(countyResult);
                return [townResult, countyResult];
            });
    }
    render() {
        return (
            <div
                style={{
                    height: "150px",
                    weight: "550px"
                }}
            > 
                <p>
                    Town: {this.props.gameStarted ? "?" : this.state.currentTown} 
                </p>
                <p>
                    County: {this.props.gameStarted ? "?" : this.state.currentCounty}
                </p>
                <p>
                   Latitude: {this.props.gameStarted ? "?" : } 
                </p>
                <p>
                    Longitude: {this.props.gameStarted ? "?"}
                </p>
            </div>
        )
    }



};

export default InfoBox

