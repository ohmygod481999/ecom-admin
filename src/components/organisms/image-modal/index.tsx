import React from "react"
import Button from "../../fundamentals/button"
import Modal from "../../molecules/modal"

type ImageModalProps = {
  handleClose: () => void
  onSubmit?: () => void
  loading?: boolean
  title: string
  imageUrl: string
}

const ImageModal: React.FC<ImageModalProps> = ({
  handleClose,
  title,
  loading,
  onSubmit,
  imageUrl
}) => {
  return (
    <Modal handleClose={handleClose}>
      <Modal.Body>
        <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold text-center">{title}</span>
        </Modal.Header>
        <Modal.Content>
          <div className="flex mb-4 inter-small-regular text-grey-50 items-center justify-center">
            <img src={imageUrl} alt="image name" className="object-cover" />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="w-full flex justify-center items-center">
            <Button
              variant="ghost"
              size="small"
              onClick={handleClose}
              className="mr-2"
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default ImageModal
