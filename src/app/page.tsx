import Footer from "./components/Footer/Footer";
import SpecialButton from "./components/SpecialButton/SpecialButton";

export default function Home(){
    return (
    <div className="flex flex-col h-screen justify-between">
        <div className="grid mx-5 mt-10">
            <SpecialButton href={"/config"} text={"CONFIG"}></SpecialButton>
            <SpecialButton href={"/general"} text={"GENERAL"}></SpecialButton>
            <SpecialButton href={"/matrix"} text={"MATRIX"}></SpecialButton>
            <SpecialButton href={"/record"} text={"RECORD"}></SpecialButton>
            <SpecialButton href={"/graph"} text={"GRAPH"}></SpecialButton>
        </div>
        <Footer></Footer>
    </div>)
}