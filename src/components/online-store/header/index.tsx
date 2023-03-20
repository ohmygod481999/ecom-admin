import { useEffect, useRef, useState } from "react"
import { useOnlineStore } from "../../../context/online-store"
import { NextSelect } from "../../molecules/select/next-select"
import { ComputerMonitorIcon } from "../online-store-icon"
import axios from "axios"

export const OnlineStoreHeader = () => {
  const { typeView, setTypeView, pages, currentPage, setCurrentPage, currentSections } =
    useOnlineStore()

  const nextSelectOptions = pages.map((page) => {
    return {
      label: page.name,
      value: page.path,
      id: page.id,
    }
  })
  const nextSelectCurrentPage = {
    label: currentPage.name,
    value: currentPage.path,
    id: currentPage.id,
  }
  const save =()=>{
    axios.put(`http://longvb.net/api-admin/pages/${currentPage.id}`,{
      "page_settings": {
        "sections": [...currentSections]
      }
    }).then(()=>{
      console.log({
        "page_settings":
        {
          "sections": [...currentSections]
        }
      }
      )
    })
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
            setCurrentPage({ path: e.value, name: e.label, id: e.id })
          }}
          options={nextSelectOptions}
          value={nextSelectCurrentPage}
          placeholder="Choose a collection"
          isClearable
        />
      </div>

      <div className="flex items-center">
        <div className="dropdown group relative mx-4 inline-block">
          <button className="inline-flex h-5 w-5 items-center">
            <ComputerMonitorIcon size={12} />
          </button>
          <div className="absolute z-50 hidden group-hover:block ">
            <ul className="flex flex-col  overflow-hidden rounded pt-1 text-gray-700 ">
              <li
                onClick={() => {
                  setTypeView("desktop")
                }}
                className="cursor-pointer border bg-white px-4 py-2 hover:bg-grey-5 "
              >
                Desktop
              </li>
              <li
                onClick={() => {
                  setTypeView("mobile")
                }}
                className="cursor-pointer border bg-white px-4 py-2 hover:bg-grey-5 "
              >
                Mobile
              </li>
            </ul>
          </div>
        </div>
        <button className="btn btn-secondary btn-small" onClick={()=>save()}>
          <span className="mr-xsmall last:mr-0">SAVE</span>
        </button>
      </div>
    </div>
  )
}
