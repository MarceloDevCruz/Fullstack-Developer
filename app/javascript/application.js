// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// import "@hotwired/turbo-rails"
// import "controllers"
// import "@popperjs/core"
// import "bootstrap"
import React from "react"
import "./channels"
import { createRoot } from "react-dom/client"
import App from "./src/App.jsx"

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root")
  if (!container) return
  const root = createRoot(container)
  root.render(<App />)
})