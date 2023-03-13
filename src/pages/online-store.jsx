import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Route, Routes } from "react-router-dom"
import PrivateRoute from "../components/private-route"
import SEO from "../components/seo"
import OnlineStoreLayout from "../components/templates/online-store-layout"
import OnlineStoreProvider from "../context/online-store"
import OnlineStore from "../domain/online-store"

const OnlineStorePage = () => {
  return (
    <PrivateRoute>
      <OnlineStoreRoutes />
    </PrivateRoute>
  )
}

const OnlineStoreRoutes = () => {
  return (
    <OnlineStoreProvider>
      <DndProvider backend={HTML5Backend}>
        <OnlineStoreLayout>
          <SEO title="Medusa" />
          <Routes className="h-full">

            {/* my custom routes */}
            <Route path="/" element={<OnlineStore />} />
          </Routes>
        </OnlineStoreLayout>
      </DndProvider>
    </OnlineStoreProvider>
  )
}

export default OnlineStorePage
