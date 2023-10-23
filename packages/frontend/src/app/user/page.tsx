import UserForm from '@/components/UserForm/UserForm';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-8 flex bg-white dark:bg-black rounded shadow-md">
        <h1 className="text-xl mb-4">User Details Form</h1>
        <UserForm />
      </div>
    </div>
  );
}
