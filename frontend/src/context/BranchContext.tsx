import React, { createContext, useContext, useState } from 'react';

type BranchContextType = {
    branchIndex: number;
    setBranchIndex: (index: number) => void;
};

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const BranchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [branchIndex, setBranchIndex] = useState(0);
    return (
        <BranchContext.Provider value={{ branchIndex, setBranchIndex }}>
            {children}
        </BranchContext.Provider>
    );
};

export const useBranchContext = (): BranchContextType => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error("useBranchContext must be used within a BranchProvider");
    }
    return context;
};
