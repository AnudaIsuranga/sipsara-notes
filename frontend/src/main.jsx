import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#ffffff",
              borderRadius: "14px",
              padding: "14px 16px",
              fontWeight: "600",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
            },
            success: {
              style: {
                background: "#16a34a",
                color: "#ffffff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#ffffff",
              },
            },
          }}
        />
      </>
    </AuthProvider>
  </StrictMode>
);