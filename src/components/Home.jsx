import { useEffect, useState } from 'react';

export default function Home() {
  const [slide, setSlide] = useState(0);

  function nextSlide() {
    setSlide((prev) => {
      if (prev >= slides.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    })
  }
  function prevSlide() {
    setSlide((prev) => {
      if (prev <= 0) {
        return slides.length - 1;
      } else {
        return prev - 1;
      }
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  });

  const slides = [
    "/DebtsPage.png",
    "/MortgagePage.png",
    "/ExpensesPage.png"
  ];

  return (
    <>
      <div className='relative w-full mt-20'>
        <h2 className="text-2xl font-semibold text-center mt-5 mb-3">Sign up free to get full access</h2>
        <div className="relative h-full overflow-hidden rounded-lg md:h-96">
          <img src={slides[slide]} className="absolute block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-fit" alt={`Image ${slide + 1}`} />
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-0 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button key={index} type="button" 
              className={`border-slate-800 w-3 h-3 rounded-full cursor-pointer ${slide === index ? 'bg-slate-600' : 'bg-slate-300'}`}
              onClick={() => setSlide(index)}
            ></button>
          ))}
        </div>
        <button type="button" 
          className="shadow absolute ml-8 top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          onClick={prevSlide}
        >
          <span className='text-3xl'>&#10094;</span>
        </button>
        <button type="button"
          className="shadow absolute mr-8 top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          onClick={nextSlide}
        >
          <span className='text-3xl'>&#10095;</span>
        </button>
      </div>
    </>
  )
}
