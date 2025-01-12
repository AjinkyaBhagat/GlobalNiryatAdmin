import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

type Product = {
  name: string;
  description: string;
  image: string;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    createdBy: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = async () => {
    try {
      await axios.post("http://localhost:3000/api/products", newProduct);
      setProducts((prev) => [...prev, { ...newProduct, _id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
      setNewProduct({ name: "", description: "", image: "", createdBy: "" });
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = (id: string) => {
    console.log("Edit product with id:", id);
    // Add logic to edit the product
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, bgcolor: "", color: "#fff", minHeight: "100vh" }}>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Product List</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateProduct} sx={{ bgcolor: "#1E88E5" }}>
          Create New Product
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ bgcolor: "", overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead sx={{ bgcolor: "#2459a5", overflowX: "auto" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ACTIONS</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>NAME</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>DESCRIPTION</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>IMAGE</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>CREATED BY</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>CREATED AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton onClick={() => handleEditProduct(product._id)} sx={{ color: "#1E88E5" }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product._id)} sx={{ color: "#E53935" }}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>{product.createdBy}</TableCell>
                  <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            bgcolor: "#1E1E1E",
            color: "#fff",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Create Product
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={newProduct.name}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={newProduct.description}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="normal"
            value={newProduct.image}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Created By"
            name="createdBy"
            fullWidth
            margin="normal"
            value={newProduct.createdBy}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
         
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveProduct} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductTable;
