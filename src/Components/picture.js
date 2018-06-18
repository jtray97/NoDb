import React from 'react';
const Picture = (props) =>{
    return (
    
    <div className="imgDiv" style = {{width: props.width,
                    height: props.height}}>

        <img src={props.img} alt="asdf"/>

    </div>
    )
    
}
export default Picture