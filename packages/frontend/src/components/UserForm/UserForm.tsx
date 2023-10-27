"use client";
import { FC, useMemo } from 'react'
// components/UserForm.tsx

import { useState } from 'react';

export interface AccountNameProps {
    activeAccount: string
  }

export const UserForm: FC<AccountNameProps> = ({ activeAccount, ...rest }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        sex: '',
        twitterAccount: '',
        telegramAccount: '',
        email: '',
        accountString: activeAccount,
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
                    accountString: activeAccount,
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
            <div className={`text-lg font-semibold mb-4 px-4 py-2 rounded shadow-md ${alert.status === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                {alert.status === 'success' ? '✅' : '❌'} {alert.message}
                

                <p className="mt-2">{alert.status === 'success' ? 'Thank you for signing up! We will contact you soon and let you know if you were successfully verified.' :
                 'Looks like there is something wrong, please submit an issue on our github repository or contact us.'} </p>
            </div>
        }
        <div className='flex flex-col justify-center items-center space-y-5 '>
            <p className="mb-4 text-gray-700">When you will be successfully verified, you will be able to mint on this account: <span className=" text-xs">{activeAccount}</span></p>
            <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full p-2.5 border rounded-md border-gray-300 focus:border-blue-500 hover:border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full p-2.5 border rounded-md border-gray-300 focus:border-blue-500 hover:border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="w-full p-2.5 border rounded-md border-gray-300 focus:border-blue-500 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-200">
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
                    className="w-full p-2.5 border rounded-md border-gray-300 focus:border-blue-500 hover:border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="email"
                    required
                    className="w-full p-2.5 border rounded-md border-gray-300 focus:border-blue-500 hover:border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <input
                    name="telegramAccount"
                    value={formData.telegramAccount}
                    onChange={handleChange}
                    placeholder="Telegram account"
                    className="w-full p-2.5 border rounded-md border-gray-300 focus:border-blue-500 hover:border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <button type="submit" className="w-full p-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 transition">
                    Submit
                </button>
            </form>

        </div>
        
        

        </>

    );
}

export default UserForm;
