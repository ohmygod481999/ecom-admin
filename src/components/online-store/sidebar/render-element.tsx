import { useEffect, useState } from "react"
import useNotification from "../../../hooks/use-notification"
import { ReactSortable } from "react-sortablejs"
import EditBlockModal from "../../organisms/edit-block-modal"

export const RenderBlocks = (props) => {
  const { elements, keyValue, handleElement } = props
  const [active, setActive] = useState<boolean>(false)
  const [blocks, setBlocks] = useState<any>(elements[keyValue].blocks)
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [indexBlock, setIndexBlock] = useState<number>(0)
  const notification = useNotification()
  console.log("block", elements)
  useEffect(() => {
    handleElement(blocks, keyValue, "blocks", "blocks")
  }, [blocks])

  return (
    <li key={keyValue} className=" list-item list-none">
      <span
        className={`flex cursor-pointer select-none items-center justify-between rounded py-1 ${
          active ? "bg-green-50" : ""
        }`}
        onClick={() => {
          setActive(!active)
        }}
      >
        {keyValue}
        <svg
          width="16px"
          height="16px"
          className={` transition-all ${active ? "rotate-90" : ""}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" fill="none" width="24" height="24" />
          <g>
            <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586" />
          </g>
        </svg>
      </span>
      <ul
        className={`${
          active ? "block" : "hidden"
        } border-l border-gray-300 transition-all`}
        style={{ paddingInlineStart: "20px" }}
      >
        <ReactSortable list={blocks} setList={setBlocks} handle=".handle">
          {blocks.map((block, index) => (
            <li
              key={index}
              className={`group flex cursor-pointer items-center  py-1 `}
            >
              <p
                className="w-[-webkit-fill-available]"
                onClick={() => {
                  setActiveModal(!activeModal)
                  setIndexBlock(index)
                }}
              >
                Block {index}
              </p>
              <span className="hidden gap-1 group-hover:flex">
                <svg
                  className="z-50"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    if (blocks.length > 1) {
                      setBlocks((prev) => {
                        let tempBlocks = [...prev]
                        tempBlocks.splice(index, 1)
                        console.log(tempBlocks)
                        return [...tempBlocks]
                      })
                    } else {
                      notification("Error", "", "error")
                    }
                  }}
                >
                  <g id="Interface / Trash_Full">
                    <path
                      id="Vector"
                      d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="handle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 19H8V16H11V19Z" fill="#1F2328" />
                  <path d="M11 13.5H8V10.5H11V13.5Z" fill="#1F2328" />
                  <path d="M11 8H8V5H11V8Z" fill="#1F2328" />
                  <path d="M16 19H13V16H16V19Z" fill="#1F2328" />
                  <path d="M16 13.5H13V10.5H16V13.5Z" fill="#1F2328" />
                  <path d="M16 8H13V5H16V8Z" fill="#1F2328" />
                </svg>
              </span>
            </li>
          ))}
        </ReactSortable>
      </ul>
      {activeModal ? (
        <EditBlockModal
          indexValue={indexBlock}
          blocks={blocks}
          keyValue={keyValue}
          handleClose={() => {
            setActiveModal(false)
          }}
          handleSave={(blocks) => {
            setBlocks([...blocks])
            setActiveModal(false)
          }}
          handleElement={handleElement}
        />
      ) : (
        ""
      )}
    </li>
  )
}

export const renderElement = {
  button: {
    render: (elements, key, handleElement) => (
      <>
        {key}
        <input
          type="text"
          className="mb-1 w-full rounded-md border border-grey-20 bg-grey-5 p-2"
          value={elements[key].text}
          onChange={(e) => {
            handleElement(e, key, "text", "button")
          }}
        />
        <input
          type="text"
          className="w-full rounded-md border border-grey-20 bg-grey-5 p-2"
          value={elements[key].url}
          onChange={(e) => {
            handleElement(e, key, "url", "button")
          }}
        />
      </>
    ),
  },
  image: {
    render: (elements, key, handleElement) => (
      <>
        {key}
        <input
          type="text"
          className="w-full rounded-md border border-grey-20 bg-grey-5 p-2"
          value={elements[key].url}
          onChange={(e) => {
            handleElement(e, key, "url", "image")
          }}
        />
      </>
    ),
  },
  blocks: {
    render: (elements, key, handleElement) => {
      return (
        <RenderBlocks
          elements={elements}
          keyValue={key}
          handleElement={handleElement}
        />
      )
    },
  },
  boolean: {
    render: (elements, key, handleElement) => (
      <div className="flex gap-3">
        {key}
        <input
          type="checkbox"
          defaultChecked={elements[key].value}
          onChange={(e) => {
            handleElement(e, key, "value", "boolean")
          }}
        />
      </div>
    ),
  },
}
