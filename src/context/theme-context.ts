import { createContext, Dispatch, SetStateAction } from "react";

type ContextType = [string, Dispatch<SetStateAction<string>>];
const ThemeContext = createContext<ContextType>(["dark", () => { }])

export default ThemeContext