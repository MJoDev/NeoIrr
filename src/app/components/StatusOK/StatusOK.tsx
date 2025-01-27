import CircleCheckIcon from "../../utils/icons/CircleCheckIcon";

export default function StatusOK() {
    return (
        <div className="bg-[#4CAF50] text-white rounded-lg p-8 shadow-lg mb-10">
            <div className="flex flex-col items-center justify-center">
                <CircleCheckIcon className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">Status OK, Connected</p>
            </div>
        </div>
    );
}