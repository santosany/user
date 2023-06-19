import axios, { AxiosPromise } from "axios"
import { UserData } from "../Interface/UserData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async(data: UserData): AxiosPromise<any>=> {
    const response = axios.post(API_URL + '/users', data)
    const userData: UserData[] = (await response).data.map((item: any) => ({
        id: item.userId,
        name: item.userName,
        email: item.userEmail,
        department: item.userDepartment.name
    }));

    return userData;
    
}

export function useUserDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:postData,
        retry:2,
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data'])
        }
    })
    return mutate;


}