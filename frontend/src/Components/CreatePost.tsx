import axios from "axios"
import { useState, useEffect } from "react"
import { data } from "./data"

interface User {
  _id: string
  username: string
  email: string
}

interface CreatePostProps {
  user: User
}

interface Post {
  _id: string
  slug: string
  title: string
  message: string
  createdAt: string
  user: { username: string }
}

export default function CreatePost({ user }: CreatePostProps) {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [latestPosts, setLatestPosts] = useState<Post[]>([])
  const [isPublic, setIsPublic] = useState(true)
  const [IP_Address, setIP_Address] = useState("")

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await axios.get(`${data.api}/api/paste/all`)
        setLatestPosts(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchLatest()
  }, [])

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
    if (!title || !message) {
      setError("Title and message are required!")
      setSuccess("")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await axios.post(`${data.api}/api/paste/create`, {
        user: user._id,
        title,
        message,
        password,
        IP_Address,
        isPublic: isPublic === true
      }, { withCredentials: true })

      if (res.status === 201) {
        setTitle("")
        setMessage("")
        setPassword("")
        setError("")
        setSuccess("Post created successfully!")
      }
    } catch (err: any) {
      setSuccess("")
      setError(err.response?.data?.message || "Something went wrong!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row gap-6 p-6">
      
      <div className="flex-1">
        <div className="w-full mt-14 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-gray-50">Create a Post</h2>
          <p className="text-gray-400 mb-6">
            Hello, <span className="font-semibold text-white">{user.username}</span>! Share something with the world.
          </p>

          {success && <span className="block mb-3 px-4 py-2 bg-green-500 text-white rounded-xl font-medium text-sm animate-pulse">{success}</span>}
          {error && <span className="block mb-3 px-4 py-2 bg-red-500 text-white rounded-xl font-medium text-sm animate-pulse">{error}</span>}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
            rows={6}
          ></textarea>
          <input
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          <div className="flex items-center mb-4">
        <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            id="publicPost"
            className="mr-2"
        />
        <label htmlFor="publicPost" className="text-gray-300">
            Make this post public
        </label>
        </div>

          <button
            onClick={Submit}
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-colors ${
              isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-50">Latest Sharings</h2>
        <div className="space-y-4 max-h-[calc(100vh-48px)] overflow-y-auto pr-2">
          {latestPosts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
          {latestPosts.map((post) => (
            <div key={post._id} onClick={() => window.location.href = `/post/${post?.slug}`} className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{post.message.slice(0, 100)}{post.message.length > 100 && "..."}</p>
              <p className="text-gray-500 text-xs">
                by <span className="font-medium">{post.user.username}</span> • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}