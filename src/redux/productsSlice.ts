"use client";

import api from "@/api/axios";
import { useState } from "react";

type Product = {
  id: number;
  reference: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  description: string;
};

const [products, setProducts] = useState<Product[]>([]);

const getProducts = async () => {
  try {
    const res = await api.get<Product[]>("");
  } catch (error) {}
};
