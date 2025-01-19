import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
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

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Handle saving new or edited product
  const handleSaveProduct = async () => {
    if (editingProduct) {
      // Editing an existing product
      await updateProduct(editingProduct._id, editingProduct);
      setProducts((prev) =>
        prev.map((product) => (product._id === editingProduct._id ? editingProduct : product))
      );
      setEditingProduct(null);  // Reset editingProduct
    } else {
      // Creating a new product
      await createProduct(newProduct);
      setProducts((prev) => [
        ...prev,
        { ...newProduct, _id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ]);
    }
    setNewProduct({ name: "", description: "", image: "", createdBy: "" });
    setOpenModal(false);  // Close the modal
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);  // Set the product to be edited
    setOpenModal(true);  // Open the modal for editing
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
                <ProductTableRow
                  key={product._id}
                  product={product}
                  onEdit={handleEditProduct}  // Pass the handleEditProduct function
                  onDelete={handleDeleteProduct}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ProductModal
        open={openModal}
        product={editingProduct || newProduct}  // Pass editingProduct if it's being edited
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
      />
    </Box>
  );
};

export default ProductTable;
