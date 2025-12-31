import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { FilterProvider } from "./context/FilterContext"

export const AppLayers = () => {
    return (
        <AuthProvider>
            <FilterProvider>
                <App />
            </FilterProvider>
        </AuthProvider>
    )
}