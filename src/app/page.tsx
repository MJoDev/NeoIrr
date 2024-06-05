import SpecialButton from "./components/SpecialButton/SpecialButton";
export default function Home(){
    return (
    <div className="flex flex-col h-screen justify-between">
        <div className="grid mx-5">
            <SpecialButton href={"/config"} text={"Config"}></SpecialButton>
            <SpecialButton href={"/general"} text={"General"}></SpecialButton>
            <SpecialButton href={"/matrix"} text={"Matrix"}></SpecialButton>
            <SpecialButton href={"/record"} text={"Record"}></SpecialButton>
        </div>
    </div>)
}