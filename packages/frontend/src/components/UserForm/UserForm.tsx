"use client";

// components/UserForm.tsx

import { useState } from 'react';

const UserForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        sex: '',
        twitterAccount: '',
        telegramAccount: '',
        email: '',
        accountString: '',
    });

    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })
    
    
    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            console.log({ formData })
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            // Check if response is OK (status code in the range 200-299)
            if (response.ok) {
                setAlert({ status: 'success', message: 'Signup successfully' });
                setFormData({ 
                    firstName: '',
                    lastName: '',
                    sex: '',
                    twitterAccount: '',
                    telegramAccount: '',
                    email: '',
                    accountString: '',
                });
            } else {
                const data = await response.json();
                setAlert({ status: 'error', message: data.error || 'Something went wrong' });
            }
        } catch (error: any) {
            console.log({ error });
            setAlert({ status: 'error', message: 'Something went wrong' });
        }
    };
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
        {alert.message && 
            <div className={`text-lg font-semibold mb-4 px-4 py-2 rounded ${alert.status === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
            {alert.status === 'success' ? '✅' : '❌'} {alert.message}
            </div>
        }
        <form onSubmit={onSubmit} className="space-y-4 flex flex-col space-x-4">
            <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="p-2 border dark:bg-black border-gray-300"
            />
            <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
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
                <option value="female">Other</option>
            </select>
            <input
                name="twitterAccount"
                value={formData.twitterAccount}
                onChange={handleChange}
                placeholder="Twitter Account"
                required
                className="p-2 border dark:bg-black border-gray-300"
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="email"
                required
                className="p-2 border dark:bg-black border-gray-300"
            />
            <input
                name="telegramAccount"
                value={formData.telegramAccount}
                onChange={handleChange}
                placeholder="Telegram account"
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
        </>

    );
}

export default UserForm;
