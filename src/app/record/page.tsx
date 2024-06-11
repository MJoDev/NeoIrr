import BackButton from "../components/BackButton/BackButton"

export default function RecordPage() {

    const logs = [
        { id: 1, name: 'logs' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Xiaomi' },
    ]

    return (
        <div className="flex flex-col h-screen justify-between"> 
            <div className="mx-4">
                <div className="bg-black text-white text-4xl text-center font-bold mb-10">
                    RECORD
                </div> 
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <label className="ml-3 text-sm font-medium text-gray-700">TAG / SN / ID:</label>
                                <input type="checkbox" className="h-4 w-4 text-black-600 border-gray-300 rounded flex mx-5"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="ml-2 mx-2"> 
                <BackButton/>
            </div>
        </div>
        
    )
}