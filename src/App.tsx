import { Route, Routes } from "react-router-dom"
import AdminConnexion from "./assets/pages/AdminConnexion"
import BookDetails from "./assets/pages/BookDetails"
import BooksList from "./assets/pages/BooksList"
import ClientAccount from "./assets/pages/ClientAccount"
import ClientConnexion from "./assets/pages/ClientConnexion"
import ClientInscription from "./assets/pages/ClientInscription"
import DashboardLayout from "./assets/components/Dashboard/DashboardLayout"
import Dashboard from "./assets/pages/Dashboard"

function App() {

  return (

    <Routes>

      <Route path="/" element={<BooksList />} />
      <Route path="/inscription-client" element={<ClientInscription />} />
      <Route path="/connexion-client" element={<ClientConnexion />} />
      <Route path="/compte-client" element={<ClientAccount />} />

      <Route path="/connexion-admin" element={<AdminConnexion />} />
      <Route path="/details-livre" element={<BookDetails />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes >

  )
}

export default App
