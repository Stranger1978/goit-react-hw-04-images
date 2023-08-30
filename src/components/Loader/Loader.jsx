import React from "react";
import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
    return (
        <div>
        <MagnifyingGlass
            visible={true}
            height="180"
            width="180"
            ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor='#c0efff'
            color='#e15b64'
        />
        </div>
    )
}; 


