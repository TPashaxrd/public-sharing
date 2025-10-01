import axios from "axios"
import { useEffect, useState } from "react"
import { data } from "./data"

export default function Auth() {
  const [IP_Address, setIP_Address] = useState("Yükleniyor...")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    async function CheckIP() {
      try {
        const res = await axios.get("https://api.ipify.org?format=json")
        setIP_Address(res.data.ip)
      } catch {
        setIP_Address("IP alınamadı")
      }
    }
    CheckIP()
  }, [])

  async function Submit() {
    if (!IP_Address || !username || !password || (!isLogin && !email)) {
      setError("All fields are required.")
      setSuccess("")
      return
    }

    try {
      let res
      if (isLogin) {
        res = await axios.post(`${data.api}/api/auth/login`, { username, password }, { withCredentials: true })
      } else {
        res = await axios.post(`${data.api}/api/auth/register`, { username, password, email, IP_Address })
      }

      if (res.status === 200 || res.status === 201) {
        setError("")
        setUsername("")
        setPassword("")
        setEmail("")
        setSuccess(isLogin ? "Successfully logged in!" : "Account created successfully!")
        setTimeout(() => window.location.reload(), 400)
      }
    } catch (err: any) {
      setSuccess("")
      setError(err.response?.data?.message || "Something went wrong!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">Public Sharing</h1>
        <p className="text-center mb-6 text-gray-300">{isLogin ? "Please login to continue" : "Create your account"}</p>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold rounded-l-lg ${isLogin ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r-lg ${!isLogin ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {success && (
          <span className="flex items-center justify-center mb-3 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md animate-pulse text-sm max-w-full break-words">
            {success}
          </span>
        )}
        {error && (
          <span className="flex items-center justify-center mb-3 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md animate-pulse text-sm max-w-full break-words">
            {error}
          </span>
        )}

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="button"
            onClick={Submit}
            className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg py-2 font-semibold mt-2"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">Your IP: {IP_Address}</p>

        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="text-gray-300 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  )
}