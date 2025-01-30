import React, { useState, useEffect } from "react";

const FlashMessage = ({ flash }) => {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        if (flash?.msg || flash?.error) {
            const timeout = setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [flash]);

    if (!showMessage || (!flash?.msg && !flash?.error)) {
        return null;
    }

    return (
        <div>
            {showMessage && flash?.msg && flash?.msg.status === "success" && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    {flash.msg.description}
                </div>
            )}

            {showMessage && flash?.error && (
                <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
                    {flash.error}
                </div>
            )}
        </div>
    );
};

export default FlashMessage;
