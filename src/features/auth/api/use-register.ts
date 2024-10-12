import { useRouter } from "next/navigation";

import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


// API Route type safe 
// API Request type safe and Response type safe

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>

export const useRegister = () => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn : async ({json}) => {
            // const response = await client.api.auth.login.$post // This .$post is able here //
            const response = await client.api.auth.register["$post"]({json})
            return await response.json()
        },
        onSuccess: async () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
        }
    })

    return mutation;
};