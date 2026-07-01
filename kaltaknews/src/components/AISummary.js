import { X } from 'lucide-react';

const AISummary = ({ isOpen, summary, loading, onClose }) => {

    if (!isOpen) return null;

    return (
        <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-[90%] max-w-2xl p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        AI Summary
                    </h2>
                    <button onClick={ onClose } className="text-gray-500 ml-1 mt-1 hover:text-red-500 text-xl">
                        <X />
                    </button>
                </div>
                {
                    loading ? (

                        <div className="flex justify-center py-10">

                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>

                        </div>

                    ) : (

                        <>
                            <h3 className="font-bold text-lg mb-2">
                                📌 Key Points
                            </h3>

                            <ul className="list-disc pl-6 space-y-2 mb-5">

                                { summary?.keyPoints?.map((point, index) => (

                                    <li key={ index }>
                                        { point }
                                    </li>

                                )) }

                            </ul>

                            <h3 className="font-bold text-lg mb-2">
                                💡 Why It Matters
                            </h3>

                            <p className="mb-5">
                                { summary?.whyItMatters }
                            </p>

                            <h3 className="font-bold text-lg mb-2">
                                ⚡ Quick Take
                            </h3>

                            <p>
                                { summary?.quickTake }
                            </p>
                        </>

                    )
                }
            </div>
        </div>
    )

}
export default AISummary;