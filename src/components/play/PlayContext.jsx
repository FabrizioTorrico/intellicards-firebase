import { createContext, useContext, useState } from "react";
const PlayContext = createContext(null);

export const PlayProvider = ({ children }) => {
  const [playActive, setPlayActive] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  return (
    <PlayContext.Provider value={{ playActive, setPlayActive, canPlay, setCanPlay }}>
      {children}
    </PlayContext.Provider>
  );
};

const usePlay = () => useContext(PlayContext);
export default usePlay;
