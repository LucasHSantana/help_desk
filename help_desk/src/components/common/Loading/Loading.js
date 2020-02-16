import React from 'react';

import './Loading.css';

function Loading(props) {     
    const visible = props.visible;
    
    if (visible){
        return (            
            <div className="loading">
                <svg origin="../../assets/loading.svg" width="100" height="66" viewBox="0 0 100 66" fill="none" xmlns="http://www.w3.org/2000/svg">                    
                    <path className="obj" d="M12 6C12 3.79086 10.2091 2 8 2H6C3.79086 2 2 3.79086 2 6V58C2 60.2091 3.79086 62 6 62H8C10.2091 62 12 60.2091 12 58V6Z" fill="#4527FE"/>                                        
                    <path className="obj" d="M26 6C26 3.79086 24.2091 2 22 2H20C17.7909 2 16 3.79086 16 6V58C16 60.2091 17.7909 62 20 62H22C24.2091 62 26 60.2091 26 58V6Z" fill="#09C105"/>                                        
                    <path className="obj" d="M40 6C40 3.79086 38.2091 2 36 2H34C31.7909 2 30 3.79086 30 6V58C30 60.2091 31.7909 62 34 62H36C38.2091 62 40 60.2091 40 58V6Z" fill="#27FE97"/>                                        
                    <path className="obj" d="M54 6C54 3.79086 52.2091 2 50 2H48C45.7909 2 44 3.79086 44 6V58C44 60.2091 45.7909 62 48 62H50C52.2091 62 54 60.2091 54 58V6Z" fill="#FE2727"/>                                        
                    <path className="obj" d="M68 6C68 3.79086 66.2091 2 64 2H62C59.7909 2 58 3.79086 58 6V58C58 60.2091 59.7909 62 62 62H64C66.2091 62 68 60.2091 68 58V6Z" fill="#27FE97"/>                                        
                    <path className="obj" d="M82 6C82 3.79086 80.2091 2 78 2H76C73.7909 2 72 3.79086 72 6V58C72 60.2091 73.7909 62 76 62H78C80.2091 62 82 60.2091 82 58V6Z" fill="#09C105"/>                                        
                    <path className="obj" d="M96 6C96 3.79086 94.2091 2 92 2H90C87.7909 2 86 3.79086 86 6V58C86 60.2091 87.7909 62 90 62H92C94.2091 62 96 60.2091 96 58V6Z" fill="#4527FE"/>                    
                </svg>    
                <p>Carregando</p> 

                {/* <svg origin="../../assets/loading.svg" width="100" height="66" viewBox="0 0 100 66" fill="none" xmlns="http://www.w3.org/2000/svg">                    
                    <path className="obj" d="M12 6C12 3.79086 10.2091 2 8 2H6C3.79086 2 2 3.79086 2 6V58C2 60.2091 3.79086 62 6 62H8C10.2091 62 12 60.2091 12 58V6Z" fill="#FE2727"/>                                        
                    <path className="obj" d="M26 6C26 3.79086 24.2091 2 22 2H20C17.7909 2 16 3.79086 16 6V58C16 60.2091 17.7909 62 20 62H22C24.2091 62 26 60.2091 26 58V6Z" fill="#D800C2"/>                                        
                    <path className="obj" d="M40 6C40 3.79086 38.2091 2 36 2H34C31.7909 2 30 3.79086 30 6V58C30 60.2091 31.7909 62 34 62H36C38.2091 62 40 60.2091 40 58V6Z" fill="#FF6B00"/>                                        
                    <path className="obj" d="M54 6C54 3.79086 52.2091 2 50 2H48C45.7909 2 44 3.79086 44 6V58C44 60.2091 45.7909 62 48 62H50C52.2091 62 54 60.2091 54 58V6Z" fill="#FBF100"/>                                        
                    <path className="obj" d="M68 6C68 3.79086 66.2091 2 64 2H62C59.7909 2 58 3.79086 58 6V58C58 60.2091 59.7909 62 62 62H64C66.2091 62 68 60.2091 68 58V6Z" fill="#09C105"/>                                        
                    <path className="obj" d="M82 6C82 3.79086 80.2091 2 78 2H76C73.7909 2 72 3.79086 72 6V58C72 60.2091 73.7909 62 76 62H78C80.2091 62 82 60.2091 82 58V6Z" fill="#27FE97"/>                                        
                    <path className="obj" d="M96 6C96 3.79086 94.2091 2 92 2H90C87.7909 2 86 3.79086 86 6V58C86 60.2091 87.7909 62 90 62H92C94.2091 62 96 60.2091 96 58V6Z" fill="#4527FE"/>                    
                </svg>       */}
            </div>  
            
        );
    } else {
        return null;
    }
}

export default Loading;