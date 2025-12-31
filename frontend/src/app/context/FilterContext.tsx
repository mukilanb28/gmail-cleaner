import { createContext, useState, useContext } from 'react';
import type { IFilterContext, IFilterProviderProps } from './interface';



const FilterContext = createContext<IFilterContext | undefined>(undefined);

export const FilterProvider = ({ children }: IFilterProviderProps) => {

    const [processCount, setProcessCount] = useState<number>(500);
    const [groupByDomain, setGroupByDomain] = useState<boolean>(false);

    const onChangeProcessCount = (value: number) => {
        setProcessCount(value);
    };
    const onChangeGroupByDomain = (value: boolean) => {
        setGroupByDomain(value);

    };

    return (
        <FilterContext.Provider
            value={{ processCount, groupByDomain, onChangeProcessCount, onChangeGroupByDomain }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = (): IFilterContext => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
