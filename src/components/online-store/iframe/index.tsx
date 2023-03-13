import React, { useEffect, useRef } from "react"
import { useOnlineStore } from "../../../context/online-store"

const OnlineStoreIframe = () => {
  const ref = useRef<HTMLIFrameElement>(null)
  const { setIframeDocument, setIframe } = useOnlineStore()

  const handleLoad = () => {
    const iframe = ref.current

    const sectionId = "free-offer"

    if (iframe) {
      iframe.onload = () => {
        console.log("iframe loaded")
        const doc = iframe?.contentDocument?.documentElement
        const iframeWindow = iframe?.contentWindow
        console.log(iframeWindow?.location.pathname)
        setIframeDocument(doc || null)
        setIframe(iframe || null)
      }
    }
  }

  useEffect(() => {
    handleLoad()
  }, [])

  return (
    <div
      style={{
        height: "calc(100vh - 56px)",
      }}
    >
      <iframe
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
        }}
        src="http://longvb.net"
        title="YouTube video player"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  )
}

export default OnlineStoreIframe
