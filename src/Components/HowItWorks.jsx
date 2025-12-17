import React from 'react';

const HowItWorks = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                How Contest Platform Works
            </h1>

            <div className="space-y-4">
                <div className="border p-4 rounded">
                    <h2 className="font-bold text-lg">1️⃣ Create Account</h2>
                    <p>Sign up using email or Google login.</p>
                </div>

                <div className="border p-4 rounded">
                    <h2 className="font-bold text-lg">2️⃣ Join Contest</h2>
                    <p>Choose a contest and submit your task before deadline.</p>
                </div>

                <div className="border p-4 rounded">
                    <h2 className="font-bold text-lg">3️⃣ Submit Task</h2>
                    <p>Upload your solution according to contest rules.</p>
                </div>

                <div className="border p-4 rounded">
                    <h2 className="font-bold text-lg">4️⃣ Winner Selection</h2>
                    <p>Admin reviews submissions and selects winners.</p>
                </div>

                <div className="border p-4 rounded">
                    <h2 className="font-bold text-lg">5️⃣ Get Reward</h2>
                    <p>Winners receive prize money and appear on leaderboard.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;

