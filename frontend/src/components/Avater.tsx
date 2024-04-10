
interface Avater{
    name: string,
    type: "big" | "small",
}
 const Avater = ({name , type = "small"}:Avater) => {
  return (
    <>
        <div className={
            `relative inline-flex items-center justify-center overflow-hidden 
            bg-zinc-800 rounded-full ${ type == "small" ? "w-8 h-8" : "h-10 w-10"}`
        }>
            <span className="font-medium text-zinc-200 ">{name[0]}</span>
        </div>
    </>
  )
}


export default Avater