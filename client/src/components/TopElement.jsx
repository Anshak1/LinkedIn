export function TopELement({title,icon}){
    return <div className="flex items-center flex-col text-xs text-gray-500 hover:text-black cursor-pointer">
        <div>
            {icon}
        </div>
        <div>
            {title}
        </div>
    </div>
}