import axios, { AxiosPromise } from "axios"
import { UserData } from "../Interface/UserData";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

export const putData = async (data: UserData): Promise<void> => {

    const response = await axios.put(`${API_URL}/users/${data.id}`, data);
    console.log(response);
};

export function useUserDataUpdate() {
    const queryClient = useQueryClient();
    const update = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data'])
        }
    })
    return update;


}