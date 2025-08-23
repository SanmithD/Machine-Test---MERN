import { Loader2 } from "lucide-react"

function Loader() {
  return (
    <div className='h-screen flex justify-center items-center ' >
        <Loader2 className="size-20 animate-spin" />
    </div>
  )
}

export default Loader