import { createContext, useContext, useState } from "react";
const PlayContext = createContext(null);

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      {children}
    </PlayContext.Provider>
  );
};

const usePlay = () => useContext(PlayContext);
export default usePlay;
