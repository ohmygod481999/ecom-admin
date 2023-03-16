import axios from "axios"
import React, { createContext, ReactNode, useEffect, useState } from "react"

type OnlineStoreContextType = {
  typeView: string
  setTypeView: (value:string) => void
  isLoading: boolean
  setLoading: (status: boolean) => void
  inputValue: string
  setInputValue: (value: string) => void
  iframeDocument: HTMLElement | null
  setIframeDocument: (value: HTMLElement | null) => void
  iframe: HTMLIFrameElement | null
  setIframe: (value: HTMLIFrameElement | null) => void
  currentPage: {
    path: string
    name: string
  }
  setCurrentPage: (value: {
    path: string
    name: string
  }) => void
  pages: any[]
}

const OnlineStoreContext = createContext<OnlineStoreContextType>({
  typeView:"desktop",
  setTypeView: ()=>{},
  isLoading: true,
  setLoading: () => {},
  inputValue: "",
  setInputValue: () => {},
  iframeDocument: null,
  setIframeDocument: () => {},
  iframe: null,
  setIframe: () => {},
  currentPage: {
    path: "/",
    name: "Home",
  },
  setCurrentPage: () => {},
  pages: [],
})

type Props = {
  children?: ReactNode
}

function htmlToElement(html: string) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function getElementByEcomId(iframeDoc: HTMLElement, ecomid: string) {
  return iframeDoc.querySelector(`[ecom-id="${ecomid}"]`);
}

const updateSection = (sectionId: string, inputValue: string, iframeDocument: HTMLElement | null) => {
  if (iframeDocument) {
    // get element which has attribute ecom-id=sectionId
    const element = iframeDocument.querySelector(`[ecom-id=${sectionId}]`);
    if (element) {
      axios
        .post(`http://longvb.net/api-admin/sections/${sectionId}/preview`, {
          section_settings: {
            variables: {
              text2: {
                type: 'text',
                text: inputValue,
              },
            },
          },
        })
        .then(({data}) => {
          const {sections} = data;
          Object.keys(sections).forEach(_sectionId => {
            const section = getElementByEcomId(iframeDocument, _sectionId);
            const replacedElement = htmlToElement(sections[sectionId]);
            if (section && replacedElement) {
              section.parentNode?.replaceChild(replacedElement, section);
            }
          });
        });
    }
  }
};

const OnlineStoreProvider = ({ children }: Props) => {
  const [typeView, setTypeView] = useState<string>('desktop');
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [iframeDocument, setIframeDocument] = useState<HTMLElement | null>(null)
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null)
  const [currentPage, setCurrentPage] = useState({
    path: "/",
    name: "Home",
  })

  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
  ]
  

  useEffect(() => {
    if (iframeDocument) {
      updateSection("free-offer", inputValue, iframeDocument);
    }
  }, [inputValue, iframeDocument])

  useEffect(() => {
    if (iframe) {
      iframe.src = `http://longvb.net${currentPage.path}`
    }
  }, [currentPage, iframe])

  return (
    <OnlineStoreContext.Provider
      value={{
        typeView: typeView,
        setTypeView: setTypeView,
        isLoading: isLoading,
        setLoading: setIsLoading,
        inputValue: inputValue,
        setInputValue: setInputValue,
        iframeDocument: iframeDocument,
        setIframeDocument: setIframeDocument,
        iframe: iframe,
        setIframe: setIframe,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        pages: pages,
      }}
    >
      {children}
    </OnlineStoreContext.Provider>
  )
}

export default OnlineStoreProvider

export const useOnlineStore = () => {
  const {
    typeView,
    setTypeView,
    isLoading,
    setLoading,
    inputValue,
    setInputValue,
    iframeDocument,
    setIframeDocument,
    iframe,
    setIframe,
    currentPage,
    setCurrentPage,
    pages,
  } = React.useContext(OnlineStoreContext)

  return {
    typeView,
    setTypeView,
    isLoading,
    setLoading,
    inputValue,
    setInputValue,
    iframeDocument,
    setIframeDocument,
    iframe,
    setIframe,
    currentPage,
    setCurrentPage,
    pages,
  }
}
