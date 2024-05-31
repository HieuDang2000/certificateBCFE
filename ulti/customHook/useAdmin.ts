import { resolveMethod } from "thirdweb";
    import { useReadContract } from "thirdweb/react";
import { CONTRACT } from "../constant";

export default function useAdmin() {
  const { data, isLoading } = useReadContract({ 
    contract: CONTRACT, 
    method: "owner", 
    params: [] 
  });
}