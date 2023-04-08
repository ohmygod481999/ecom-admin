import React from "react"
import IconProps from "../types/icon-type"

const GalleryIcon: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke={color}
        stroke-miterlimit="10"
        stroke-width="12"
        d="M55.6 158c16.3-21.6 32.6-43.1 48.9-64.7.4-.6 4.4-5.6 11.2-5.5 6.3.1 10 4.5 10.5 5.2 11.2 13.5 22.3 27 33.5 40.5m-58.9-35.3c-5.1-8.1-10.2-16.4-15.3-24.5-.3-.5-4.3-6.5-11.7-6.4-7.2.1-11.1 5.8-11.4 6.3-10.9 18.3-21.9 36.5-32.8 54.9M170 96c0 40.9-33.1 74-74 74s-74-33.1-74-74 33.1-74 74-74 74 33.1 74 74Zm-45.6-47.1c7.1 0 13 5.8 13 13s-5.8 12.9-13 12.9c-7.1 0-13-5.8-13-12.9 0-7.1 5.9-13 13-13Z"
      />
    </svg>
  )
}

export default GalleryIcon
