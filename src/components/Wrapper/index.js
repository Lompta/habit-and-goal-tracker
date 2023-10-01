import React from 'react';
import "./styles.scss";

const Wrapper = ({children}) => {
    return (
        <div className="wrapper">
            {children}
        </div>
    )
}

export default Wrapper;
