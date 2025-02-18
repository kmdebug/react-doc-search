import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Document: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="bg-[#f9fbfd] m-[11px]">
      <div className="bg-white max-w-[804px] h-[1201px] border mx-auto p-[68px] text-[15px] font-sans leading-normal font-normal shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.02),_0px_0px_0px_0.7px_rgba(27,_31,_35,_0.20)]">
        <p className="whitespace-pre-wrap text-black">{children}</p>
      </div>
    </div>
  );
};

export default Document;
