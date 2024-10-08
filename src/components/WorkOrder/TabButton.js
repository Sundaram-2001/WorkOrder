import React from 'react';

const TabButton = React.memo(({ isActive, onClick, children }) => (
    <button
    className={`mr-4 pb-2 ${isActive ? 'border-b-2 border-black' : ''}`}
    onClick={onClick}
    >
    {children}
    </button>
));

export default TabButton;