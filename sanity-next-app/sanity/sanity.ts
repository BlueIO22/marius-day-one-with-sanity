import { createClient } from "next-sanity";
import { projectId } from "./env";

export const sanityClient = createClient({
    projectId,
    dataset: 'production',
    apiVersion: '2024-07-17',
    useCdn: true
})