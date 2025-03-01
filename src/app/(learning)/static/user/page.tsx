"use client";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
}

const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]); 

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data: User[]) => setUsers(data)); 
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
