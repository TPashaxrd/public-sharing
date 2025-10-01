import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { data } from "./data";

export default function Header() {

    async function Logout() {
        try {
            const res = await axios.get(`${data.api}/api/auth/logout`)
            if(res.status === 201) { 
                alert("Successfully logged out.")
                setTimeout(() => window.location.reload(), 200)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className="bg-blue-600 text-white w-full h-16 flex items-center justify-between px-6 shadow-lg fixed top-0 left-0 z-50">
      <h1 className="text-xl font-bold tracking-wide">Public Sharing</h1>
      <nav className="flex gap-4">
        <button className="hover:bg-blue-500 transition-colors px-3 py-1 rounded">Home</button>
        <button onClick={Logout} title="Logout" className="hover:bg-blue-500 transition-colors px-3 py-1 rounded"><BiLogOut size={20} /></button>
      </nav>
    </div>
  )
}
