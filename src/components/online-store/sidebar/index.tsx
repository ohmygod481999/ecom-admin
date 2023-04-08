import React, { IframeHTMLAttributes, useEffect, useState } from "react"
import { useOnlineStore } from "../../../context/online-store"
import { renderElement } from "./render-element"
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
              key={section.id}
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
    setInputValue,
    currentPage,
    sectionId,
    setCurrentSections,
    inputValue,
    currentSections,
  } = useOnlineStore()

  const [elements, setElements] = useState({})
  useEffect(() => {
    if (sectionId) {
      axios
        .get(`http://longvb.net/api-admin/pages/${currentPage.id}`)
        .then(({ data }) => {
          const sectionsData: [] = data.page["settings"].sections
          setCurrentSections(sectionsData)
          const section: any = sectionsData.filter(
            (section: any) => section.id == sectionId
          )[0]
          setElements(section.settings["elements"])
        })
    }
  }, [sectionId])
  useEffect(() => {
    setInputValue({ elements })
    setCurrentSections((prev) => {
      if (prev && prev.length >= 1) {
        const index = prev.findIndex((section) => section.id === sectionId)
        if (index !== -1) {
          prev[index] = {
            id: sectionId,
            settings: { elements },
          }
        }
        return prev
      }
      return prev
    })
  }, [elements])
  const handleElement = (e: any, key, keyValue, type) => {
    if (type == "blocks") {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: [...e],
        },
      }))
    } else if (type == "image") {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: e,
        },
      }))
    } else if (type == "datasource") {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: { id: e },
        },
      }))
    } else {
      setElements((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [keyValue]: e.target.value,
        },
      }))
    }
  }
  return (
    <div className="h-[calc(100vh-56px)] w-80">
      <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
        {currentPage.name}
      </div>
      <div className="h-full">
        <p className="px-4 py-4 text-sm uppercase">Featured Collection</p>
        <ul className="h-[calc(100%-52px)] overflow-y-scroll pl-1">
          {Object.keys(elements).map((key, index) => {
            return (
              <li key={key} className="flex flex-col px-4 py-1 capitalize">
                {renderElement[elements[key].type]?.render(
                  elements,
                  key,
                  handleElement
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
