// src/api/apiService.js
import axios from "axios";

// Set base URL from environment
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000, // ⏱️ Optional: timeout 10s
//   headers: {
//     "Content-Type": "application/json",
//   },
});

// GET
export const getData = async (url) => {
  try {
    const { data } = await API.get(url);
    return data;
  } catch (error) {
    console.error("GET error:", error);
    throw error;
  }
};

// POST
export const postData = async (url, formData) => {
  try {
    const { data } = await API.post(url, formData,{
        headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("POST error:", error);
    throw error;
  }
};

// PUT
export const putData = async (url, formData) => {
  try {
    const { data } = await API.put(url, formData);
    return data;
  } catch (error) {
    console.error("PUT error:", error);
    throw error;
  }
};

// DELETE
export const deleteData = async (url) => {
  try {
    const { data } = await API.delete(url);
    return data;
  } catch (error) {
    console.error("DELETE error:", error);
    throw error;
  }
};
