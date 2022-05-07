const NewTicket = () => {
    return (
        <div className="w-full translate-y-40 flex justify-center items-center">
            <div className="w-full max-w-md rounded-lg shadow-md bg-gray-150 flex font-sm text-sm text-gray-800 flex-col gap-6 p-8">
                <div className="w-full">
                    <p className="text-left">Title</p>
                    <input
                        className="w-full border mt-1 rounded-md px-3 h-10 border-gray-300 outline-none focus:outline-none focus:border-blue-300"
                    />
                </div>
                <div className="w-full">
                    <p className="text-left">Price</p>
                    <input
                        type="number"
                        className="w-full border mt-1 rounded-md px-3 h-10 border-gray-300 outline-none focus:outline-none focus:border-blue-300"
                    />
                </div>
                <button className="w-full py-2 mt-10 rounded-lg text-white bg-indigo-600 text-center">Submit</button>
            </div>
        </div>
    )
}

export default NewTicket;