"use client"

import { useState } from "react";
import BackButton from "../components/BackButton/BackButton";
import Matrix from "../components/Matrix/Matrix";
import RecordButton from "../components/RecordButton/RecordButton";



export default function MatrixPage() {

    const text: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    const [showSection, setShowSection] = useState('section1');
    const [isNextClicked, setIsNextClicked] = useState(false);
    // Función para cambiar la sección
    const toggleSection = () => {
        setShowSection(prevSection => (prevSection === 'section1' ? 'section2' : 'section1'));
        setIsNextClicked(true);
    };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10">
                    MATRIX
                </div> 
                {showSection === 'section1' ? (
                    <div>
                        <div className="text-xl text-center mt-6 mb-4">
                            Press the Yellow Button in the device
                        </div>
                        <button className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                        <div className="bg-white border border-gray-400 rounded-md p-8 shadow-md w-80 mx-auto">
                            <div className="bg-gray-100 border border-gray-400 rounded-md p-6">
                                <div className="text-6xl font-bold text-center">0<div className="text-sm text-gray-500">REF: 10-40 CM</div></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-xl text-center mt-6 mb-4">
                            Press the Red Button in the device
                        </div>
                        <button className="rounded-md border border-gray-500 px-4 py-2 mx-auto flex mb-5">TEST</button>
                        <Matrix text={text}/>
                    </div>
                )}
                

                
            </div>
            <div className="ml-2 mx-2 grid grid-cols-2"> 
                {!isNextClicked ? (
                    <button onClick={toggleSection} className="rounded-full border border-green-500 flex justify-center items-center mb-10 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5">NEXT</button>
                ) : (
                    <RecordButton/>
                )}
                <BackButton/>
            </div>
        </div>
    )
}