'use client';
import { useState, useEffect } from "react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { client } from "../constant";

export function useEmail() {
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const email = await getUserEmail({ client });
                await setUserEmail(email);
                await setLoading(false);
            } catch (error) {
                console.error('Error fetching user email:', error);
                // Handle the error appropriately (e.g., set an error state, display a message)
            }
        };

        fetchUserEmail();

    }, [client]); // Include 'client' in the dependency array

    return { userEmail, loading };
}