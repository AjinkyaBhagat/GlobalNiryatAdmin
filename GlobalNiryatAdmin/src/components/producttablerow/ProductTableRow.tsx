import React from "react";
import { TableCell, TableRow, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Product } from "../../types/product";

type ProductTableRowProps = {
  product: Product;
  onEdit: (product: Product) => void;  // Change to pass the full product
  onDelete: (id: string) => void;
};

const ProductTableRow: React.FC<ProductTableRowProps> = ({ product, onEdit, onDelete }) => (
  <TableRow>
    <TableCell>
      <Box display="flex" gap={1}>
        <IconButton onClick={() => onEdit(product)} sx={{ color: "#1E88E5" }}>  {/* Pass the entire product */}
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(product._id)} sx={{ color: "#E53935" }}>
          <Delete />
        </IconButton>
      </Box>
    </TableCell>
    <TableCell>{product.name}</TableCell>
    <TableCell>{product.description}</TableCell>
    <TableCell>
      <img src={product.image} alt={product.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }} />
    </TableCell>
    <TableCell>{product.createdBy}</TableCell>
    <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
  </TableRow>
);

export default ProductTableRow;
