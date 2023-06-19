import axios, { AxiosPromise } from "axios"
import { UserData } from "../Interface/UserData";
import { useDelete, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'


export const useUserDelete = async (id: number): Promise<void> => {
    
    const response =axios.delete(`${API_URL}/users/${id}`);
    console.log(response)
  };