"use client"
import { useEffect, useState } from "react"
import BackButton from "../components/BackButton/BackButton"
import { useBluetooth } from "../utils/BluetoothContext";

export default function RecordPage() {

    const [savedRecords, setSavedRecords] = useState<any[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<Set<number>>(new Set());

    useEffect(() => {
        const records = localStorage.getItem('savedRecords');
        if (records) {
          setSavedRecords(JSON.parse(records));
        }
      }, []);

    const handleCheckboxChange = (index: number) => {
        setSelectedRecords((prevSelectedRecords) => {
          const newSelectedRecords = new Set(prevSelectedRecords);
          if (newSelectedRecords.has(index)) {
            newSelectedRecords.delete(index);
          } else {
            newSelectedRecords.add(index);
          }
          return newSelectedRecords;
        });
      };

      const handleDeleteSelected = () => {
        const updatedRecords = savedRecords.filter((_, index) => !selectedRecords.has(index));
        setSavedRecords(updatedRecords);
        localStorage.setItem('savedData', JSON.stringify(updatedRecords));
        setSelectedRecords(new Set());
      };

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10 mt-10">
                    RECORD
                </div> 
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form>
                        <div className="space-y-4">
                            <div className="grid items-center">
                                {savedRecords.map((record, index) => (
                                    <div className="flex mb-10" key={index}>
                                        <label className="ml-3 text-sm font-medium text-gray-700">TAG/SN/ID: {record.id}</label>
                                        <input type="checkbox" checked={selectedRecords.has(index)} onChange={() => handleCheckboxChange(index)} className="h-4 w-4 text-black-600 border-gray-300 rounded flex mx-5"/>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="ml-2 mx-2 grid"> 
                <button className="rounded-full border border-red-500 bg-red-500 text-white flex justify-center items-center mb-5 text-2xl gap-1 py-4 px-4 hover:scale-105 transition ml-5 mx-5" onClick={handleDeleteSelected} disabled={selectedRecords.size === 0}>
                    DELETE SELECTED
                </button>
                <BackButton/>
            </div>
        </div>
        
    )
}