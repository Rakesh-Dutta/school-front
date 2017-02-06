import React from 'react';
import Box from '../Box/Box'; 

export default (props) => {
    var list = props.items || [];    
    return(
        <div className="list">
            <h1>{props.header}</h1>
            {list.map(item => <Box key={item.id} id={item.id} css={item.css} text={item.text} click={props.click}></Box>)}
        </div>
    );
}