import React from "react"
import { useOnlineStore } from "../../../context/online-store"
import { NextSelect } from "../../molecules/select/next-select"

export const OnlineStoreSidebar = (props: {}) => {
  const {
    isLoading,
    inputValue,
    setInputValue,
    pages,
    currentPage,
    setCurrentPage,
  } = useOnlineStore()
  const NextSelect_Options = pages.map((page)=>{
    return {
      label : page.name,
      value: page.path
    }
  })
  const NextSelect_currentPage = {
    label: currentPage.name,
    value: currentPage.path
  }
  return (
    <div className="w-80 p-2">
      <input
        type="text"
        className="w-full rounded-md border border-grey-90 p-2"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
      <NextSelect
        label="Collection"
        isMulti={false}
        onChange={(e: any) => {
          setCurrentPage({path: e.value, name: e.label})
        }}
        options={NextSelect_Options}
        value={NextSelect_currentPage}
        placeholder="Choose a collection"
        isClearable
      />
    </div>
  )
}
