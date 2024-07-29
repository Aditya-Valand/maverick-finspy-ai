import React from 'react';
import FileUpload from '../components/home/FileUpload';
import Rupees from '../assets/rupee.png';

export default function Home() {

    const handleUpload = (file)=>{
        alert(`${file.name} uploaded`);
    }

  return (
    <div className="max-w-screen-2xl">
      <div className="flex justify-evenly">
        <div className="w-1/2 pl-14 py-12">
          <h1 className="font-sans text-9xl font-semibold">FinSpy</h1>
          <p className="mt-14 leading-tight text-5xl">
            AI based solution to detect fraud transactions
          </p>
        </div>
        <div className="py-12">
          <img src={Rupees} alt="" className="rotate-horizontal h-72" />
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto flex gap-x-10 justify-center items-center">
        <FileUpload onFileUpload={handleUpload} />
        <button className="h-20 w-48 font-silk text-[28px] text-white bg-black rounded-full">
          Detect
        </button>
      </div>
    </div>
  );
}
