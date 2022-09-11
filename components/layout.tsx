import React from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-md mx-auto mt-8">
        {children}
    </div>
  );
};

