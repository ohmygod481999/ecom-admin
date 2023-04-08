import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "../organisms/sidebar"
import Topbar from "../organisms/topbar"
import { PollingProvider } from "../../context/polling"
import { OnlineStoreSidebarLeft, OnlineStoreSidebarRight } from "../online-store/sidebar"
import { OnlineStoreHeader } from "../online-store/header"
import { EditCodeHeader } from "../online-store/edit-code/header"
import { EditCodeSidebarLeft } from "../online-store/edit-code/sidebar"

const OnlineStoreLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen inter-base-regular text-grey-90">
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <OnlineStoreHeader/>
      <div className=" flex ">

        <OnlineStoreSidebarLeft />
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
        <OnlineStoreSidebarRight/>
      </div>
    </div>
  )
}


export const OnlineStoreEditCodeLayout: React.FC<React.PropsWithChildren> = ({ children }) =>{
  return (
    <div className="flex flex-col w-full h-screen">
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <EditCodeHeader/>
      <div className="flex h-full">
        {children}
      </div>
    </div>
  )
}

export default OnlineStoreLayout
