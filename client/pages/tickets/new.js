import { useRouter } from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const router = useRouter();

    const { errors, loading, sendRequest } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: { title, price },
        onSuccess: () => router.push('/'),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    }

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value);
        setPrice(!isNaN(value) ? value : '');
    }
    const onBlur = () => {
        setPrice((prev) => prev.toFixed(2));
    }
    return (
        <div className="w-full translate-y-40 flex justify-center items-center">
            <div className="w-full max-w-md rounded-lg shadow-md bg-gray-150 flex font-sm text-sm text-gray-800 flex-col gap-6 p-8">
                <div className="w-full">
                    <p className="text-left">Title</p>
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        className="w-full border mt-1 rounded-md px-3 h-10 border-gray-300 outline-none focus:outline-none focus:border-blue-300"
                    />
                    {errors?.title && (
                        <p className="text-xs text-red-700">{errors.title}</p>
                    )}
                </div>
                <div className="w-full">
                    <p className="text-left">Price</p>
                    <input
                        value={price}
                        type="number"
                        step="0.01"
                        onChange={handlePriceChange}
                        onBlur={onBlur}
                        className="w-full border mt-1 rounded-md px-3 h-10 border-gray-300 appearance-none outline-none focus:outline-none focus:border-blue-300"
                    />
                    {errors?.price && (
                        <p className="text-xs text-red-700">{errors.price}</p>
                    )}
                </div>
                {errors?.generic && (
                    <ul className="bg-red-400 mt-2 list-disc text-white rounded-md pl-8 pr-5 py-3">
                        {errors.generic}
                    </ul>
                )}
                <button
                    className="w-full py-2 mt-10 rounded-lg flex justify-center items-center text-white bg-indigo-600 text-center"
                    onClick={handleSubmit}
                >
                    {loading && (
                        <div className="w-4 h-4 border-2 mr-2 border-t-white border-slate-300 rounded-full animate-spin"></div>
                    )}
                    Submit
                </button>
            </div>
        </div>
    )
}

export default NewTicket;