import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../../services/api";
import ProductModal from "../Productmodal/ProductModal";
import ProductTableRow from "../producttablerow/ProductTableRow";
import { Product } from "../../types/product";
import { tableHeadStyles, tableCellStyles } from "../../styles/tablestyles";

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", image: "", createdBy: "" });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);  // For editing product
  const [error, setError] = useState<string | null>(null); // For handling image size error

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Handle image selection and conversion to base64 with size validation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check the file size (5MB = 5 * 1024 * 1024 bytes)
      const MAX_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        setError("File size exceeds 5MB. Please upload a smaller image.");
        return; // Exit if file size is too large
      } else {
        setError(null); // Clear error if file size is valid
      }

      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert to Base64
      reader.onload = () => {
        if (reader.result) {
          if (editingProduct) {
            setEditingProduct((prev) => prev ? { ...prev, image: reader.result as string } : prev);
          } else {
            setNewProduct((prev) => ({ ...prev, image: reader.result as string }));
          }
        }
      };
    }
  };

  // Handle saving new or edited product
  const handleSaveProduct = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct._id, editingProduct);
      setProducts((prev) =>
        prev.map((product) => (product._id === editingProduct._id ? editingProduct : product))
      );
      setEditingProduct(null);
    } else {
      await createProduct(newProduct);
      setProducts((prev) => [
        ...prev,
        { ...newProduct, _id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ]);
    }
    setNewProduct({ name: "", description: "", image: "", createdBy: "" });
    setOpenModal(false);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  return (
    <Box sx={{ padding: 4, bgcolor: "", color: "#fff", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Product List</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Create New Product
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={tableHeadStyles}>
              <TableRow>
                {["Actions", "Name", "Description", "Image", "Created By", "Created At"].map((header) => (
                  <TableCell key={header} sx={tableCellStyles}>
                    {header.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <ProductTableRow key={product._id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar for error handling */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <ProductModal
        open={openModal}
        product={editingProduct || newProduct}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveProduct}
        onChange={(e) => {
          const { name, value } = e.target;
          if (editingProduct) {
            setEditingProduct((prev) => prev ? { ...prev, [name]: value } : prev);
          } else {
            setNewProduct((prev) => ({ ...prev, [name]: value }));
          }
        }}
        onImageChange={handleImageChange}
      />
    </Box>
  );
};

export default ProductTable;
