import axios, { AxiosPromise } from "axios"
import { UserData } from "../Interface/UserData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async(): AxiosPromise<UserData[]>=> {
    const response = axios.get(API_URL + '/users')
    
     // Convert to UserData[] interface
    const userData: UserData[] = (await response).data.map((item: any) => ({
        id: item.userId,
        name: item.userName,
        email: item.userEmail,
        department: item.userDepartment
    }));

    return userData;
    
}

export function useUserData(){
    const query = useQuery({
        queryFn:fetchData,
        queryKey:['user-data'],
        retry:2,
        staleTime: 60 * 1000
    })
    return{
        ...query,
        data:query.data
    }


}