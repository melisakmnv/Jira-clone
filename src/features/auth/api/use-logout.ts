import { toast } from "sonner";

import { useRouter } from "next/navigation";

import {  InferResponseType } from "hono";

import { useMutation, useQueryClient} from "@tanstack/react-query";

import { client } from "@/lib/rpc";


// API Route type safe 
// API Request type safe and Response type safe

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {

    const router = useRouter()
    const queryClient = useQueryClient()


    const mutation = useMutation<ResponseType, Error>({
        mutationFn : async () => {
            // const response = await client.api.auth.login.$post // This .$post is able here //
            const response = await client.api.auth.logout["$post"]()

            if (!response.ok) {
                throw new Error("Failed to logout")
            }

            return await response.json()
        },
        onSuccess : () => {
            toast.success("You are now logged out")
            router.refresh();
            queryClient.invalidateQueries({ queryKey : ["current"]});
        },
        onError: () => {
            toast.error("Failed to log out")
        }

    })

    return mutation;
};