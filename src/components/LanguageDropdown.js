// import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {updateLanguage} from "../context/actions/userActions/userActions";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import i18n from "i18next";

function LanguageDropdown({ direction, ...args }) {
      //getting from global state
  const { userState, userDispatch } =
  useContext(GlobalContext);

    const handleLanguageClick =(language)=> {
        userDispatch( updateLanguage(language) );
        i18n.changeLanguage(language)
        // if(language === 'ur'){
        //     document.getElementById('div-lang-dir').setAttribute('dir', 'rtl')
        // }else{
        //     document.getElementById('div-lang-dir').setAttribute('dir', 'ltr')
        // }

        setTimeout(()=>{
            window.location = '/';
        }, 1000)
            
    }
    return(
    <Dropdown  data-bs-theme="dark" style={{margin:'0 20px 0px 20px'}}>
        <Dropdown.Toggle variant="secondary" size='sm' style={{background:'none', fontSize: '14px', color:'black'}}>
            {i18n.t('language')}
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={()=>handleLanguageClick('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleLanguageClick('ur')}>Urdu</Dropdown.Item>
        </Dropdown.Menu>
  </Dropdown>
    );
}


export default LanguageDropdown;