import axios, { AxiosPromise } from "axios"
import { DepartmentData } from "../Interface/DepartmentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async(data: DepartmentData): AxiosPromise<any>=> {
    const response = axios.post(API_URL + '/departments', data)
    return response;
    
}

export function useUserDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:postData,
        retry:2
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data'])
        }
    })
    return mutate;


}