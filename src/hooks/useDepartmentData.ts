import axios, { AxiosPromise } from "axios"
import { DepartmentData } from "../Interface/DepartmentData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async(): AxiosPromise<DepartmentData[]>=> {
    const response = axios.get(API_URL + 'departments')
    
    const departmentData: DepartmentData[] = (await response).data.map((item: any) => ({
        id: item.departmentId,
        name: item.departmentName
    }));

    return departmentData;
    
}

export function useDepartmentData(){
    const query = useQuery({
        queryFn:fetchData,
        queryKey:['department-data'],
        retry:2,
        staleTime: 60 * 1000,
    })
    return{
        ...query,
        data:query.data?.data
    }


}