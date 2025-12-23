import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AdContextType {
  isAdFree: boolean;
  setAdFreeUntil: (minutes: number) => void;
  adFreeTimeRemaining: number; // in seconds
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider = ({ children }: { children: ReactNode }) => {
  const [adFreeUntil, setAdFreeUntilState] = useState<number | null>(null);
  const [adFreeTimeRemaining, setAdFreeTimeRemaining] = useState(0);

  const setAdFreeUntil = (minutes: number) => {
    const until = Date.now() + minutes * 60 * 1000;
    setAdFreeUntilState(until);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (adFreeUntil) {
        const remaining = Math.max(
          0,
          Math.floor((adFreeUntil - Date.now()) / 1000),
        );
        setAdFreeTimeRemaining(remaining);
        if (remaining === 0) {
          setAdFreeUntilState(null);
        }
      } else {
        setAdFreeTimeRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [adFreeUntil]);

  const isAdFree = adFreeTimeRemaining > 0;

  return (
    <AdContext.Provider
      value={{ isAdFree, setAdFreeUntil, adFreeTimeRemaining }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};
