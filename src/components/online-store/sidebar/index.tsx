import React, { IframeHTMLAttributes, useEffect, useState } from "react"
import { useOnlineStore } from "../../../context/online-store"
import { NextSelect } from "../../molecules/select/next-select"
import axios from "axios"

export const OnlineStoreSidebarLeft = (props: {}) => {
  const { pages, currentPage, setSectionId } = useOnlineStore()
  const [sections, setSections] = useState<any>([])
  const [sectionActive, setSectionactive] = useState<string>("")
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
  useEffect(() => {
    axios
      .get(`http://longvb.net/api-admin/pages/${currentPage.id}`)
      .then(({ data }) => {
        setSections(data.page["settings"].sections)
      })
  }, [currentPage.id])

  const scrollToSection = (ecomId) => {
    setSectionactive(ecomId)
    setSectionId(ecomId)
    const iframe = document.querySelector("#iframe") as HTMLIFrameElement
    const iframeDoc = iframe.contentDocument
    const iframeWindow = iframe.contentWindow
    if (iframeDoc && iframeWindow) {
      const targetElement = iframeDoc.querySelector(
        `[ecom-id="${ecomId}"]`
      ) as HTMLElement
      iframeWindow.scrollTo({
        top: targetElement?.offsetTop - 20,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-80">
      <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
        {currentPage.name}
      </div>
      <div>
        <p className="px-4 py-4 text-sm uppercase">sections</p>
        <ul className="overflow-y-scroll pl-1">
          {sections.map((section) => (
            <li
              className={`cursor-pointer px-4 py-1 capitalize ${
                sectionActive == section.id
                  ? "rounded-sm border-l-4 border-l-blue-600 bg-green-50"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section.id)
              }}
            >
              {section?.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const OnlineStoreSidebarRight = (props: {}) => {
  const {
    inputValue,
    setInputValue,
    currentPage,
    sectionId,
    setCurrentSections,
    currentSections
  } = useOnlineStore()

  const [elements, setElements] = useState({})
  useEffect(() => {
    if (sectionId) {
      axios
        .get(`http://longvb.net/api-admin/pages/${currentPage.id}`)
        .then(({ data }) => {
          const sectionsData: [] = data.page["settings"].sections
          setCurrentSections(sectionsData)
          console.log(sectionsData)
          const section: any = sectionsData.filter(
            (section: any) => section.id == sectionId
          )[0]
          setElements(section.settings["elements"])
        })
    }
  }, [sectionId])
  useEffect(()=>{
    setInputValue({elements})
    setCurrentSections((prev)=>{
      if(prev && prev.length >= 1){
        const index = prev.findIndex((section) => section.id === sectionId);
        if (index !== -1) {
          prev[index] = {
            "id": sectionId,
            "settings": {elements}
          }
        }
        return prev
      }
      return prev
    })

  },[elements])
  return (
    <div className="w-80">
      <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
        {currentPage.name}
      </div>
      <div>
        <p className="px-4 py-4 text-sm uppercase">Featured Collection</p>
        <ul className="overflow-y-scroll pl-1">
          {
            Object.keys(elements).map((key, index) => {
              return (
                <li key={key} className="flex flex-col px-4 py-1 capitalize">
                  {key}
                  {elements[key].type == "button" ? (
                    <div >
                      <input
                        type="text"
                        className="rounded-md border w-full p-2 bg-grey-5 border-grey-20 mb-1"
                        value={elements[key].text}
                        onChange={(e) => {
                          setElements((prev)=>({...prev,[key]:{
                            ...prev[key],
                            text: e.target.value
                          }}))
                        }}
                      />
                      <input
                        type="text"
                        className="rounded-md border w-full p-2 bg-grey-5 border-grey-20"
                        value={elements[key].url}
                        onChange={(e) => {
                          setElements((prev)=>({...prev,[key]:{
                            ...prev[key],
                            url: e.target.value
                          }}))

                        }}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="rounded-md border w-full p-2 bg-grey-5 border-grey-20"
                      value={elements[key].text}
                      onChange={(e) => {
                        setElements((prev)=>({...prev,[key]:{
                          ...prev[key],
                          text: e.target.value
                        }}))
         
                      }}
                    />
                  )}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
