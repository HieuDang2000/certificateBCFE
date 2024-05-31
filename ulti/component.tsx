'use client'
import { Children, useEffect, useState } from "react";

const Loading = () => {
  const [dots, setDots] = useState('');
  const text = 'Loading';

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots: string) => {
        if (prevDots === '...') {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-yellow-50">
        {text} {dots}
      </span>
    </div>
  );
};
export function CoolEffect({ children }: { children: React.ReactNode }) {
  return (<div className=" 
                 transform transition duration-300 hover:scale-105
                 filter drop-shadow-2xl drop-shadow-white bg-gray-500">
    {children}
  </div>)
}
export default Loading;