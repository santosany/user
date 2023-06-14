import axios, { AxiosPromise } from "axios"
import { DepartmentData } from "../Interface/DepartmentData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async(): AxiosPromise<DepartmentData[]>=> {
    const response = axios.get(API_URL + 'departments')
    return response;
    
}

export function useDepartmentData(){
    const query = useQuery({
        queryFn:fetchData,
        queryKey:['department-data'],
        retry:2
    })
    return{
        ...query,
        data:query.data?.data
    }


}