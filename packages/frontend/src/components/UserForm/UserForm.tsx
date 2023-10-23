"use client";

// components/UserForm.tsx

import { useState } from 'react';

const UserForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        sex: '',
        twitterAccount: '',
        gmail: '',
        accountString: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // In UserForm.tsx

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            alert("Data sent successfully!");
        } else {
            alert("Error sending data.");
        }
        } catch (error) {
        console.error("Error:", error);
        alert("Error sending data.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 space-x-4">
            <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="p-2 border dark:bg-black border-gray-300"
            />
            <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-2 border dark:bg-black border-gray-300"
            />
            <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="p-2 border dark:bg-black border-gray-300">
                <option value="" disabled>Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input
                name="twitterAccount"
                value={formData.twitterAccount}
                onChange={handleChange}
                placeholder="Twitter Account"
                className="p-2 border dark:bg-black border-gray-300"
            />
            <input
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                placeholder="Gmail"
                className="p-2 border dark:bg-black border-gray-300"
            />
            <input
                name="accountString"
                value={formData.accountString}
                onChange={handleChange}
                placeholder="Account String"
                className="p-2 border dark:bg-black border-gray-300"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white">
                Submit
            </button>
        </form>
    );
}

export default UserForm;
