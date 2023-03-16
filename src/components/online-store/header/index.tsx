import { useEffect, useRef, useState } from "react"
import { useOnlineStore } from "../../../context/online-store"
import { NextSelect } from "../../molecules/select/next-select"
import { ComputerMonitorIcon } from "../online-store-icon"

export const OnlineStoreHeader = () => {
  const {
    typeView,
    setTypeView,
    pages,
    currentPage,
    setCurrentPage,
  } = useOnlineStore()

  const [open, setOpen] = useState<boolean>(false)

  const nextSelectOptions = pages.map((page) => {
    return {
      label: page.name,
      value: page.path,
    }
  })
  const nextSelectCurrentPage = {
    label: currentPage.name,
    value: currentPage.path,
  }

  return (
    <div className="flex w-full items-center justify-between border p-2">
      <div>
        <p>Dawn</p>
      </div>
      <div className=" w-4/12 ">
        <NextSelect
          isMulti={false}
          onChange={(e: any) => {
            setCurrentPage({ path: e.value, name: e.label })
          }}
          options={nextSelectOptions}
          value={nextSelectCurrentPage}
          placeholder="Choose a collection"
          isClearable
        />
      </div>

      <div>
        <div className="group dropdown relative inline-block mx-14">
          <button className="w-5 h-5 inline-flex items-center">
              <ComputerMonitorIcon size={12} />
          </button>
          <div className="group-hover:block hidden absolute z-50 ">

            <ul className="flex-col flex  pt-1 text-gray-700 rounded overflow-hidden ">
              <li onClick={()=>{ setTypeView('desktop')}} className="bg-white px-2 py-2 border cursor-pointer hover:bg-cyan-5">
                  Desktop
              </li>
              <li onClick={()=>{ setTypeView('mobile')}} className="bg-white px-2 py-2 border cursor-pointer hover:bg-cyan-5">
                  Mobile
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
