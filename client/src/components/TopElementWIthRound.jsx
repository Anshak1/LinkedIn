export function TopELementWIthRound({title,filled}){
    return (
        <button className={`cursor-pointer px-6 py-2 rounded-full font-semibold text-sm ${filled?"bg-[#0A66C2]  text-white hover:bg-blue-950 ":"bg-white-600 text-[#0A66C2] border border-[#0A66C2] hover:bg-blue-100"}`}>
            {title}
        </button>
    )

}