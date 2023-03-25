import axios from "axios"
import { useEffect, useState } from "react"
import { useOnlineStore } from "../../../../context/online-store"
import { fileIcon } from "./icon"
import { getFileType } from "../code-editor"

export const EditCodeSidebarLeft = (props: {}) => {
  const { setSelectedFiles, setSelectedFile, selectedFile } = useOnlineStore()
  const [fileTree, setFileTree] = useState<any>({})
  const [activeLists, setActiveList] = useState<any[]>([])
  useEffect(() => {
    axios
      .get(`http://longvb.net/api-admin/code-editor/file-tree`)
      .then(({ data }) => {
        setFileTree(data.fileTree)
      })
  }, [])

  const renderObject = (obj) => {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object") {
        return (
          <li key={key} className=" list-item list-none">
            {/* icon và tên */}
            <span
              className="flex cursor-pointer select-none items-center"
              onClick={() => {
                if (activeLists.includes(key)) {
                  const temp = [...activeLists]
                  temp.splice(activeLists.indexOf(key), 1)
                  setActiveList(temp)
                } else {
                  setActiveList((prev) => [...prev, key])
                }
              }}
            >
              <svg
                width="16px"
                height="16px"
                className={`mr-1 transition-all ${
                  activeLists.indexOf(key) >= 0 ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" fill="none" width="24" height="24" />

                <g>
                  <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586" />
                </g>
              </svg>
              {key}
            </span>
            <ul
              className={`${
                activeLists.indexOf(key) >= 0 ? "block" : "hidden"
              } border-l border-gray-300 transition-all`}
              style={{ paddingInlineStart: "20px" }}
            >
              {renderObject(obj[key])}
            </ul>
          </li>
        )
      }
      return (
        <li
          key={key}
          className={`flex cursor-pointer items-center gap-1 ${
            selectedFile["filePath"] == obj[key] ? "bg-slate-300" : ""
          }`}
          onClick={() => {
            setSelectedFiles((prev) => {
              let index = 0
              if (prev.length > 0) {
                for (let i = 0; i < prev.length; i++) {
                  if (prev[i].filePath == obj[key]) {
                    index = 1
                    break
                  }
                }
              }
              if (!index) {
                return [
                  ...prev,
                  {
                    filePath: obj[key],
                    fileName: key,
                  },
                ]
              } else {
                return [...prev]
              }
            })

            setSelectedFile({
              filePath: obj[key],
              fileName: key,
            })
          }}
        >
          {fileIcon[getFileType(key)]
            ? fileIcon[getFileType(key)]
            : fileIcon["unknown"]}

          {key}
        </li>
      )
    })
  }

  return (
    <div className="h-[calc(100%-136px)] w-80">
      <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
        AA
      </div>
      <div className="h-full overflow-y-scroll">
        <p className="px-4 py-4 text-sm uppercase">sections</p>
        <div className=" h-full pl-1">{renderObject(fileTree)}</div>
      </div>
    </div>
  )
}
