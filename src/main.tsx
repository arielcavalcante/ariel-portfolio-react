import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { observeSlowInteractions } from "./performance"
import "./styles.css"

observeSlowInteractions()

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
