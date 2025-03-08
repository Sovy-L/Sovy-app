
// This file now just re-exports from our composite hook for backward compatibility
import { useAuthComposite } from "./auth/useAuthComposite";

export const useAuth = useAuthComposite;
