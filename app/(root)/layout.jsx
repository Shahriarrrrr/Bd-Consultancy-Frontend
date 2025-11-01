import Navbar from "../components/Navbar";

// app/(root)/layout.jsx
export default function RootLayout({ children }) {
  return (
    <main className="font-work-sans">
        <Navbar />
        {children}
    </main>
  );
}
