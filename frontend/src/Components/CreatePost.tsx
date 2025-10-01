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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row p-6">
      
      {/* Left: Create Post */}
      <div className="flex-1 md:mr-6 mb-6 md:mb-0">
        <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
          <p className="text-gray-300 mb-4">
            Hello, <span className="font-semibold">{user.username}</span>! Share something with the world.
          </p>

          {success && <span className="block mb-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm">{success}</span>}
          {error && <span className="block mb-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">{error}</span>}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white resize-none"
            rows={6}
          ></textarea>
          <input
            type="password"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
          />
          <button
            onClick={Submit}
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg font-semibold transition-colors ${
              isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"
            }`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Right: Latest Sharings */}
      <div className="w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Latest Sharings</h2>
        <div className="space-y-4 max-h-screen overflow-y-auto">
          {latestPosts.length === 0 && <p className="text-gray-400">No posts yet.</p>}
          {latestPosts.map((post) => (
            <div key={post._id} className="bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{post.message.slice(0, 80)}{post.message.length > 80 && "..."}</p>
              <p className="text-gray-500 text-xs">
                by {post.user.username} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
