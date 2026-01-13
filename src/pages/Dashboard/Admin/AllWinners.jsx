import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import useAxios from '../../../hooks/useAxios';

const AllWinners = () => {
    const axiosPublic = useAxios();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8; // Number of winners per page

    const { data, isLoading, isPreviousData } = useQuery({
        queryKey: ['allWinners', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-winners?page=${currentPage}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true, // Prevents flickering when switching pages
    });

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
            {/* Header Section */}
            <header className="text-center mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black tracking-tighter"
                >
                    Hall of <span className="text-primary italic">Fame</span>
                </motion.h1>
                <p className="mt-4 text-lg max-w-lg mx-auto leading-relaxed">
                    Celebrating the legendary creators who secured victory in our most challenging contests.
                </p>
            </header>

            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode='wait'>
                    {data?.winners?.map((winner, index) => (
                        <motion.div
                            key={winner._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -8 }}
                            className="border border-base-300 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            {/* Avatar Section */}
                            <div className="relative mb-6">
                                <div className="w-24 h-24 rounded-full border-2 border-base-300 p-1 group-hover:border-primary transition-colors">
                                    <img 
                                        src={winner.participantPhoto} 
                                        alt={winner.participantName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-base-100 w-8 h-8 rounded-full border border-base-300 flex items-center justify-center text-xs shadow-sm">
                                    🏆
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-black mb-1 group-hover:text-primary transition-colors">
                                    {winner.participantName}
                                </h3>
                                <div className="badge badge-outline border-base-300 text-[10px] font-bold uppercase tracking-widest opacity-50 mb-4">
                                    Champion
                                </div>
                                
                            </div>

                            {/* Footer Info */}
                            <div className="w-full pt-4 border-t border-base-300">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] uppercase font-black opacity-70">Prize</span>
                                    <span className="text-primary font-black tracking-tight">${winner.contestPrize}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {data?.totalPages > 1 && (
                <div className="flex justify-center mt-20">
                    <div className="join border border-base-300 p-1 rounded-full ">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="btn btn-ghost join-item rounded-full disabled:bg-transparent"
                        >
                            «
                        </button>
                        
                        {[...Array(data.totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`btn btn-circle join-item border-none ${
                                    currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            disabled={currentPage === data.totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, data.totalPages))}
                            className="btn btn-ghost join-item rounded-full disabled:bg-transparent"
                        >
                            »
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {data?.winners?.length === 0 && (
                <div className="text-center py-32 opacity-30 italic font-medium">
                    The Hall of Fame is currently empty. Start a contest to crown your first winner!
                </div>
            )}
        </div>
    );
};

export default AllWinners;