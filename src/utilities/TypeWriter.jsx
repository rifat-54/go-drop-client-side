import React, { useEffect, useState } from 'react';

const TypeWriter = ({text='',speed=100}) => {
    const [displayText,setDisplayText]=useState('')

    useEffect(()=>{
        let index=0;

        const interval=setInterval(() => {
            

            if(index<text.length){
                const nextchar=text[index];
               if(nextchar!==undefined){
                setDisplayText((prev)=>prev+nextchar);
               }
               index++;
            }else{
                
                clearInterval(interval);
            }
            

        }, speed);

        return()=> clearInterval(interval)

    },[text,speed])

    return (
        <div>
            {displayText}
        </div>
    );
};

export default TypeWriter;