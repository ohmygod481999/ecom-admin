import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Route, Routes } from "react-router-dom"
import { CodeEditor } from "../components/online-store/edit-code/code-editor"
import { EditCodeHeader } from "../components/online-store/edit-code/header"
import { EditCodeSidebarLeft } from "../components/online-store/edit-code/sidebar"
import PrivateRoute from "../components/private-route"
import SEO from "../components/seo"
import OnlineStoreLayout, { OnlineStoreEditCodeLayout } from "../components/templates/online-store-layout"
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
        {/* <OnlineStoreLayout>
          <SEO title="Medusa" />
          <Routes className="h-full"> */}
        {/* my custom routes */}
        {/* <Route path="/" element={<OnlineStore />} />
            <Route path="/edit-code" element={<OnlineStore/>} />
          </Routes>
        </OnlineStoreLayout> */}
        <Routes className="h-full">
          <Route
            path="/"
            element={
              <OnlineStoreLayout>
                <SEO title="Medusa" />
                <OnlineStore />
              </OnlineStoreLayout>
            }
          />
          <Route 
            path="/edit-code"
            element = {
              <OnlineStoreEditCodeLayout>
                <SEO title="Edit code" />
                <EditCodeSidebarLeft/>
                <CodeEditor/>
              </OnlineStoreEditCodeLayout>
            }
          />
        </Routes>
      </DndProvider>
    </OnlineStoreProvider>
  )
}

export default OnlineStorePage
