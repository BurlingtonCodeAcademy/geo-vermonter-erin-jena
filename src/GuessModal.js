import React from 'react'



function GuessModal(props) {
  // const greeting = "LIST OF COUNTIES GOES HERE"
  // return <h1>{greeting}</h1>
  return (
    
      <div id='modal'>

        <button onClick={props.handleGuess} id="addison-county">Addison County</button>
        <button onClick={props.handleGuess} id="bennington-county">Bennington County</button>
        <button onClick={props.handleGuess} id="caledonia-county">Caledonia County</button>
        <button onClick={props.handleGuess} id="chittenden-county">Chittenden County</button>
        <button onClick={props.handleGuess} id="essex-county">Essex County</button>
        <button onClick={props.handleGuess} id="franklin-county">Franklin County</button>
        <button onClick={props.handleGuess} id="grand-isle-county">Grand Isle County</button>
        <button onClick={props.handleGuess} id="lamoille-county">Lamoille County</button>
        <button onClick={props.handleGuess} id="orange-county">Orange County</button>
        <button onClick={props.handleGuess} id="orleans-county">Orleans County</button>
        <button onClick={props.handleGuess} id= "rutland-county">Rutland County</button>
        <button onClick={props.handleGuess} id="washington-county">Washington County</button>
        <button onClick={props.handleGuess} id="windham-county">Windham County</button>
        <button onClick={props.handleGuess} id="windsor-county">Windsor County</button>
        
        <button onClick={props.handleGuess} id="close">Close</button>
      </div>
    
  )

}



export default GuessModal


