import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "../organisms/sidebar"
import Topbar from "../organisms/topbar"
import { PollingProvider } from "../../context/polling"
import { OnlineStoreSidebar } from "../online-store/sidebar"

const OnlineStoreLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full h-screen inter-base-regular text-grey-90">
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <OnlineStoreSidebar />
      <PollingProvider>
        <div className="flex flex-col flex-1">
          <Topbar />
          <div className="">
            <main className="">
              {children}
            </main>
          </div>
        </div>
      </PollingProvider>
    </div>
  )
}

export default OnlineStoreLayout
