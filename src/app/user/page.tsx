'use client';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { chain, client } from "../client";
import { useState, useEffect } from "react";
import { getUserEmail } from "thirdweb/wallets/in-app";

const Page = () => {
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const email = await getUserEmail({ client });
                setUserEmail(email);
            } catch (error) {
                console.error('Error fetching user email:', error);
                // Handle the error appropriately
            }
        };
        fetchUserEmail(); // Call this after the component mounts
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
            <ConnectButton
                client={client}
                chain={chain}
                connectModal={{
                    size: "compact",
                }}
                appMetadata={{
                    name: "Example App",
                    url: "https://example.com",
                }}
            />
            {userEmail && <p>Welcome, {userEmail}!</p>}
        </div>
    );
};

export default Page;