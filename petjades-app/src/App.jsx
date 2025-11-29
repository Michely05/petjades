import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Cats } from "./pages/Cats";
import { Dogs } from "./pages/Dogs";
import { Colaborate } from "./pages/Colaborate";
import { Nosaltres } from "./pages/Nosaltres";
import { PrivateAccess } from "./pages/PrivateAccess";
import { PrivateAnimals } from "./pages/PrivateAnimals";
import { ProtectedRoute } from "./router/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopta-gats" element={<Cats />} />
          <Route path="/adopta-gossos" element={<Dogs />} />
          <Route path="/collabora" element={<Colaborate />} />
          <Route path="/nosaltres" element={<Nosaltres />} />
          <Route path="/acces-privat" element={<PrivateAccess />} />

          <Route
            path="/private-animals"
            element={
              <ProtectedRoute>
                <PrivateAnimals />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
