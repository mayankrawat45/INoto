import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const About = () => {

  const isLoggedIn=localStorage.getItem("authtoken")
  const navigate=useNavigate()
  useEffect(() => {
      if(!isLoggedIn){
        navigate("/login")
      }
    }, [navigate])
  return (
    <div className="w-[60vw] mx-auto my-10 flex flex-col gap-6">
      <h1 className="text-4xl font-bold">About INoto</h1>

      <p className="text-lg leading-7 text-gray-700">
        <strong>INoto</strong> is a simple and secure cloud-based note-taking application
        designed to help you store your personal notes safely. With INoto, you can
        create, edit, update and manage your notes from anywhere, anytime.
      </p>

      <h2 className="text-2xl font-semibold mt-4">Features</h2>
      <ul className="list-disc list-inside text-gray-700 text-lg leading-7">
        <li>Add, update and delete notes easily</li>
        <li>Organize notes with titles and tags</li>
        <li>Secure login system using JWT Authentication</li>
        <li>Responsive UI built with React & Tailwind CSS</li>
        <li>Fast performance using Context API for global state</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Technology Stack</h2>
      <ul className="list-disc list-inside text-gray-700 text-lg leading-7">
        <li><strong>Frontend:</strong> React, Context API, Tailwind CSS</li>
        <li><strong>Backend:</strong> Node.js, Express.js</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>Authentication:</strong> JWT Tokens</li>
      </ul>

      <p className="text-lg leading-7 text-gray-700 mt-4">
        INoto is built to focus on simplicity and efficiency—so you can focus on
        your ideas instead of managing your notes.
      </p>

      <p className="text-lg font-semibold mt-4">
        🚀 Keep noting. Keep growing.
      </p>
    </div>
  )
}

export default About
