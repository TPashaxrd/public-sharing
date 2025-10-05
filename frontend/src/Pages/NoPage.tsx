import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { Link } from "react-router-dom"

export default function NoPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
        <h1 className="text-9xl font-extrabold text-blue-600 drop-shadow-lg">404</h1>
        <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>
        <p className="mt-2 text-gray-400 text-center max-w-lg">
          Sorry, the page you are looking for doesn't exist or has been moved. 
          Please check the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-md"
        >
          Go Home
        </Link>
      </div>
      <Footer />
    </>
  )
}