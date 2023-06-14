import axios, { AxiosPromise } from "axios"
import { UserData } from "../Interface/UserData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async(): AxiosPromise<UserData[]>=> {
    const response = axios.get(API_URL + '/users')
    return response;
    
}

export function useUserData(){
    const query = useQuery({
        queryFn:fetchData,
        queryKey:['user-data'],
        retry:2
    })
    return{
        ...query,
        data:query.data?.data
    }


}