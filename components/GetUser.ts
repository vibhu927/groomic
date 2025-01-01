'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GetCurrentUser() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const session = useSession();
    
    useEffect(() => {
        const fetchUser = async () => {
            if (session?.data?.user?.email) {
                const email = session.data.user.email;
                try {
                    const response = await fetch('/api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    if (data.userId) {
                        setUserId(data.userId);
                    } else {
                        console.warn("No userId returned. Setting to null.");
                        setUserId(null);
                    }
                } catch (error) {
                    console.error("Failed to fetch user ID:", error);
                    setUserId(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setUserId(null);
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [session]);

    return userId;
}