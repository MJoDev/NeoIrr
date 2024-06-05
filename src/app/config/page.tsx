import BackButton from "../components/BackButton/BackButton";
import SpecialButton from "../components/SpecialButton/SpecialButton";

export default function ConfigPage() {
    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold">
                    CONFIG
                </div>    
            </div>
            <div className="h-10 mb-10 ml-2 mx-2">    
                <BackButton/>
            </div>
        </div>
        );

}