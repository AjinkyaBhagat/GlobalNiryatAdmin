import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ImagePreviewModalProps = {
  open: boolean;
  image: string;
  onClose: () => void;
};

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ open, image, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: 4,
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "hidden",
        }}
      >
        {/* Close button in top right corner */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "black",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Image preview */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src={image}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ImagePreviewModal;
