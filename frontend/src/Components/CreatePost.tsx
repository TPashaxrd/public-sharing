interface User {
  _id: string
  username: string
  email: string
}

interface CreatePostProps {
  user: User
}
export default function CreatePost({ user }: CreatePostProps) {
  return <h1>Hoşgeldin {user.username}</h1>
}
