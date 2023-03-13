import { Route, Routes } from "react-router-dom"
import Overview from "./overview"

const OnlineStore = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
    </Routes>
  )
}

export default OnlineStore
