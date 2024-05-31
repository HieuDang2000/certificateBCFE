'use client'
import { useReadContract } from "thirdweb/react";
import { CONTRACT } from "../../../../ulti/constant";
import { PDFEditor } from "@/app/user/login";

export default function Page({ params }: { params: { slug: number } }) {

    const { data: ctdata, isLoading: ctload, refetch: ctrefetch } = useReadContract({
        contract: CONTRACT,
        method: "certificates",
        params: [BigInt(params.slug)],
    });


    return (
        <div className="flex items-center justify-center ">
            {ctdata && (ctdata[3].toString() == "true" ? (ctdata[0].toString() == "4" ? <PDFEditor texts={ctdata[2].split(",")} /> : <>{ctdata[2]}</>) : <>This certificate has been disable</>)}
        </div >
    )
}