/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { modalStyles } from "../../styles/modalstyles";

type ProductModalProps = {
  open: boolean;
  product: { name: string; description: string; image: string; createdBy: string };
  onClose: () => void;
  onSave: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ open, product, onClose, onSave, onChange, onImageChange }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" mb={2}>
          {product.name ? "Edit Product" : "Create Product"}
        </Typography>

        {["name", "description", "createdBy"].map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            fullWidth
            margin="normal"
            value={(product as any)[field]}
            onChange={onChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
        ))}

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={onImageChange} />
        
        {/* Show image preview if available */}
        {product.image && (
          <Box mt={2} textAlign="center">
            <img src={product.image} alt="Preview" style={{ maxWidth: "100%", height: "100px" }} />
          </Box>
        )}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
