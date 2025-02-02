import React, { useState } from "react";
import { TableRow, TableCell, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../types/product";
import ImagePreviewModal from "../Productmodal/ImagePreviewModal";

type ProductTableRowProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductTableRow: React.FC<ProductTableRowProps> = ({ product, onEdit, onDelete }) => {
  const [previewOpen, setPreviewOpen] = useState(false);  // State to control preview modal
  const [imageToPreview, setImageToPreview] = useState("");  // Store the image to preview

  const handlePreview = (image: string) => {
    setImageToPreview(image);  // Set the image to preview
    setPreviewOpen(true);  // Open the preview modal
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);  // Close the preview modal
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton color="primary" onClick={() => onEdit(product)} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(product._id)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.description}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlePreview(product.image)}
            size="small"
            sx={{ fontSize: "0.75rem", padding: "4px 8px" }}
          >
            Preview
          </Button>
        </TableCell>
        <TableCell>{product.createdBy}</TableCell>
        <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
      </TableRow>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        open={previewOpen}
        image={imageToPreview}
        onClose={handleClosePreview}
      />
    </>
  );
};

export default ProductTableRow;
