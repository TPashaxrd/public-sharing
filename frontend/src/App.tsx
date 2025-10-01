import axios from "axios"
import { useEffect, useState } from "react"
import { data } from "./Components/data"
import Auth from "./Components/Auth"
import CreatePost from "./Components/CreatePost"
import Footer from "./Components/Footer"
import Header from "./Components/Header"

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function CheckUser() {
      try {
        const res = await axios.get(`${data.api}/api/auth/me`, { withCredentials: true })
        if (res.status === 200) {
          setUser(res.data.user)
          setLoading(false)
          setIsLoggedIn(true)
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          // alert("Not logged in")
        }
        if (error.response?.status === 404) {
          alert("User not found")
        }
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    CheckUser()
  }, [])

  // useEffect(() => {
  //   const login = async () => {
  //     try {
  //       const res = await axios.post(`${data.api}/api/auth/login`, {
  //         username: "toprak.altins",
  //         password: "2443.Toprak"
  //       }, { withCredentials: true })
  //       console.log("Login response:", res.data)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  //   login()
  // }, [])


  if(loading) return <div className="">Loading...</div>
  return (
    <>
     <title>Create New Paste - Public Sharing</title>
     <Header />
     {isLoggedIn && user ? (
      <CreatePost user={user} />
     ) : (
      <Auth />
     )}
     <Footer />
    </>
  )
}