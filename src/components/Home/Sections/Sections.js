import React from 'react'
import SingleSection from './SingleSection'
import {showSections} from '../../../context/actions/showSections'
import { useState, useEffect } from 'react'

function Sections() {
    const [sections, setSections] = useState([]);

    const getSections = ()=>{
        const response = showSections();
        response.then((res) => {if(res?.status === true){setSections([...res.sections]);}})
    }

    useEffect(() => {getSections()}, [])
    
    return (
        <>
            {sections.map((el,i)=>
                <SingleSection key={i} section={el} />
            )}
        </>
    )
}

export default Sections