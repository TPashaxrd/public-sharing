import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { data } from "../Components/data";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";

interface Post {
  user: {
    _id: string;
    username: string;
  };
  title: string;
  message: string;
  isPublic: boolean;
  view: number;
  createdAt: string;
  slug: string;
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [randomPosts, setRandomPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
    fetchRandomPosts();
  }, [slug]);

  async function fetchPost() {
    try {
      setLoading(true);
      if (!slug) return;
      const res = await axios.get(`${data.api}/api/paste/${slug}`);
      setPost(res?.data.post);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRandomPosts() {
    try {
      const res = await axios.get(`${data.api}/api/paste/all`);
      const allPosts: Post[] = res.data;
      const shuffled = allPosts.sort(() => 0.5 - Math.random());
      setRandomPosts(shuffled.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.p
          className="animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Loading...
        </motion.p>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        <p>Post not found</p>
      </div>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-32 px-4">
        <motion.div
          className="relative w-full max-w-4xl bg-gray-950 rounded-xl shadow-2xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-800 flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <h1 className="text-lg font-semibold text-blue-400 truncate">
              {post.title}
            </h1>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
          </div>

          <div className="px-4 py-2 text-xs text-gray-400 flex gap-4 border-b border-gray-700 bg-gray-900">
            <span>👤 {post.user.username}</span>
            <span>📅 {new Date(post.createdAt).toLocaleString()}</span>
            <span>👀 {post.view} views</span>
            {!post.isPublic && (
              <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md">
                Private
              </span>
            )}
          </div>

          <div className="flex font-mono text-sm bg-gray-950">
            <div className="bg-gray-900/90 text-gray-600 text-right pr-4 pl-2 py-2 select-none border-r border-gray-800">
              {post.message.split("\n").map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            <pre className="whitespace-pre-wrap p-4 flex-1 text-gray-200 overflow-x-auto leading-6">
              {post.message}
            </pre>
          </div>
        </motion.div>

        {randomPosts.length > 0 && (
          <motion.div
            className="w-full max-w-5xl mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              🔥 Random Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {randomPosts.map((p, i) => (
                <Link key={i} to={`/post/${p.slug}`}>
                  <motion.div
                    className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-blue-400 hover:shadow-lg transition-colors"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="font-bold text-white truncate">{p.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {p.message}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      by {p.user.username}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}