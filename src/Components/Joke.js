import React from 'react';

const Joke = (props) => {
    return (

        <h2 className= 'joke' >
            {
                props.joke
            }
        </h2>
    )

}



export default Joke;