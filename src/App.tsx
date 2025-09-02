import { Route, Routes } from "react-router"
import AdminConnexion from "./assets/pages/AdminConnexion"
import BookDetails from "./assets/pages/BookDetails"
import BooksList from "./assets/pages/BooksList"
import ClientAccount from "./assets/pages/ClientAccount"
import ClientConnexion from "./assets/pages/ClientConnexion"
import ClientInscription from "./assets/pages/ClientInscription"
import Dashboard from "./assets/pages/Dashboard"

function App() {

  return (
    <Routes>

      <Route path="" element={<BooksList />} />
      <Route path="/inscription-client" element={<ClientInscription />} />
      <Route path="/connexion-client" element={<ClientConnexion />} />
      <Route path="/compte-client" element={<ClientAccount />} />

      <Route path="/connexion-admin" element={<AdminConnexion />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/details-livre" element={<BookDetails />} />


    </Routes>
  )
}

export default App
