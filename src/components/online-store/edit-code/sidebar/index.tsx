import axios from "axios"
import { useEffect, useState } from "react"
import { useOnlineStore } from "../../../../context/online-store"
import './test.css'
export const EditCodeSidebarLeft = (props: {}) => {
    const {  } = useOnlineStore()
    const [fileTree, setFileTree] = useState<any>({})
    const [sectionActive, setSectionactive] = useState<string>("")

    useEffect(() => {
      axios
        .get(`http://longvb.net/api-admin/code-editor/file-tree`)
        .then(({ data }) => {
            setFileTree(data.fileTree)
        })
    }, [])
    const renderObject = (obj) => {
        return Object.keys(obj).map((key) => {
          if (typeof obj[key] === 'object') {
            return (
              <li key={key} className=" list-none list-item">
                <span className="caret caret-down">{key}</span>
                <ul className=" nested active border-l border-gray-300" style={{paddingInlineStart:'20px'}}>{renderObject(obj[key])}</ul>
              </li>
            );
          }
          return (
            <li key={key} className="cursor-pointer">
              {key}
            </li>
          );
        });
      };
  
    return (
      <div className="w-80 h-[calc(100%-106px)]">
        <div className="w-full border bg-white px-2 py-3 text-lg font-bold">
          AA
        </div>
        <div className="h-full overflow-y-scroll">
          <p className="px-4 py-4 text-sm uppercase">sections</p>
          <div className=" pl-1 h-full">
            {
                renderObject(fileTree)
            }
          </div>
        </div>
      </div>
    )
  }
  