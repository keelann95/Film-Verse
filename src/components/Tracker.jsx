import React from 'react'
import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import Footer from './Footer';
const Tracker = () => {

     const [playbackTime, setPlaybackTime] = useState(0); 
      const movieDuration = 3205;
    
      useEffect(() => {

        const savedTime = localStorage.getItem('playbackTime');
        if (savedTime) {
          setPlaybackTime(parseFloat(savedTime));
        }
      }, []);
    
      // Save playback time when it changes
      useEffect(() => {
        localStorage.setItem('playbackTime', playbackTime);
      }, [playbackTime]);
    
      // Calculate the playback progress as a percentage
      const playbackProgress = (playbackTime / movieDuration) * 100;
    
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
          return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
          return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
      }
      
    const images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Marvel_Studios_logo.svg/2560px-Marvel_Studios_logo.svg.png",
        "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940" ,
        "https://seeklogo.com/images/D/disney-logo-9649A88458-seeklogo.com.png",
        "https://static.wikia.nocookie.net/hbo-max/images/6/6a/HBOMax.png/revision/latest/thumbnail/width/360/height/360?cb=20201009195251",
        "https://i.ytimg.com/vi/50rAKjuTXbc/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGD4gUihyMA8=&rs=AOn4CLCTUx2eDWJoYrC22grOGoUhqpq7Aw",
        "https://www.citypng.com/public/uploads/preview/hd-white-star-wars-logo-png-701751694787021te08lp5kwd.png",
        "https://seeklogo.com/images/N/national-geographic-channel-logo-DCE048FFC0-seeklogo.com.png",
      ];
      const poster = [
        "https://preview.redd.it/what-has-happened-to-movie-posters-v0-tm2y16wnnhb81.jpg?width=640&crop=smart&auto=webp&s=2f1305986475f9787ba4dd2ca1486abdb206a377",

      ]
      const genres = [
        { name: 'Superhero', active: true },
        { name: 'Drama', active: false },
        { name: 'Sitcom', active: false },
        { name: 'Thriller', active: false },
        { name: 'Comedy', active: false },
        { name: 'Fantasy', active: false }
      ];
    
     
  return (
    <>
      <main className=' p-5'>

      <section
          className="relative  w-full h-[80vh]"
          style={{
            backgroundImage: "url(https://www.komar.de/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 8))",
              zIndex: 10,
            }}
          ></div>
          <div className="relative z-50">
            <Navbar />
          </div>
          <div className=' relative z-20 transform translate-y-72 pl-16'>
            <div>
                <h1 className=' text-[#fff] text-5xl font-serif'>Star Wars: The Force Awaken</h1>
                <div className=" pt-3 text-gray-400  flex  space-x-2">
  <h3>2h40m</h3>
  <span className="mx-1 inline-block align-middle ">-</span>
  <h3>2022</h3>
  <span className="mx-1 inline-block align-middle">-</span>
  <h3>Fantasy</h3>
  <span className="mx-1 inline-block align-middle">-</span>
  <h3>Action</h3>
</div>
 
 <p className=' pt-3 text-gray-200 text-lg font-serif'>
 Star Wars is an American epic space opera media franchise created <br /> by George Lucas, which began with the eponymous 1977 film and  quickly <br /> became a worldwide pop culture phenomenon.
 </p>
<div className=' flex justify-between'>
   <div className=" pt-9 flex items-center">
  <button className="flex items-center bg-[#03A737] text-white rounded-md  px-4 py-2">
    <FaPlayCircle className="mr-2" /> Watch Now
  </button>
  <button className="flex items-center bg-transparent text-white px-4 py-2 border rounded-md hover:bg-gray-500 ml-4">
    <CiBookmark className="mr-2" /> Add Watchlist
  </button>
</div>
 
 <div className="flex translate-y-14     space-x-1 pr-6pt-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-500 w-2.5 h-2.5 rounded-full"></div>
        ))}
      </div>
</div>
 
            </div>

          </div>
        </section>

        <section>
<div className="flex justify-center items-center space-x-14 gap-20  pt-14 my-4 overflow-auto scroll-smooth pb-8">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="h-14 w-auto  shadow-sm shadow-white " 
        />
      ))}
    </div>
</section>

<header className=' p-8 w pl-16 text-2xl font-semibold '>Continue Watching</header>
     
<div className='flex gap-4 overflow-auto pl-5'>
  <div className='w-[17vw] p-2'>
    <div className='w-[17vw] bg-w'>
    <div className='relative w-[27vw] p-2'>
      <img
        className='object-center object-cover rounded-2xl h-[24vh] w-full opacity-75'
        src="https://m.media-amazon.com/images/I/71OHH9HaB5S._AC_UF1000,1000_QL80_.jpg"
        alt="Movie Thumbnail"
      />


      <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 rounded-b-2xl text-white'>
        <div className='mb-2'>
          <h2 className='text-lg font-semibold'>The Last of Us - Episode 4</h2>
          <p className='text-sm text-gray-300'>2023</p>
        </div>

        {/* Playback Time */}
        <div className='flex items-center justify-between text-sm'>
          <span>{formatTime(playbackTime)}</span>
          <span>{formatTime(movieDuration)}</span>
        </div>

        {/* Progress Bar */}
        <div className='w-full bg-gray-700 h-2 rounded-full mt-1'>
          <div
            className='bg-green-500 h-full rounded-full'
            style={{ width: `${playbackProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>


<header className=' p-8 w pl-16 text-2xl font-semibold '>Popular of the week</header>
<section className=' p-8 pl-5 '>
    <div className=' flex overflow-auto'>
    <div className=' flex gap-3 '>
    <div className=' flex shadow-sm shadow-gray-600 p-2 w-[350px] rounded-2xl '>
        <div className=' '>
            <div className=' flex'>
                <span className=' pt-16 p-4 font-bold text-3xl'>
                    1
                </span>
                <div className=' flex'>
                    <img className=' rounded-2xl  h-[20vh] w-[120px]' src="https://m.media-amazon.com/images/I/71OHH9HaB5S._AC_UF1000,1000_QL80_.jpg" alt="" />
                    <div className=' p-4 space-y-1'>
                        <h4 className=' border w-14 p-1 border-dashed rounded-xl'>PG-13</h4>
                        <h1 className=' text-xl font-serif'>The Last Of Us</h1>
                        <p><div className=' flex font-serif text-sm text-gray-600 gap-1'>
                        <span className=' text-sm '>🎬</span>
                        <h1>Horror</h1>
                            <span>|</span>
                            <h1>Thriller</h1>
                        </div></p>
                         <div className=' flex gap-1 font-serif text-gray-300 text-sm'>
                         <span>⭐</span>
                         <h1>4.3</h1>
                            <span>|</span>
                            <h1>Movie</h1>  
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    </div>
</section>


<header className=' p-8 w pl-16 text-2xl font-semibold '>Just Releases</header>
<section className=' p-8 pl-5 '>
  <div className=' rounded-xl flex  overflow-auto  w-[90vw] '>
  <div className="  hover:scale-90 hover:duration-[0.5s] space-x-4 p-2 translate-x-4">
      {poster.map((img, index) => (
        <div key={index} className="w-64 h-80 rounded-lg overflow-hidden flex-shrink-0">
          <img
            style={{ opacity: 1, zIndex: -1 }}
            className="rounded-lg w-full h-full object-cover"
            src={img}
            alt="poster"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-xl font-semibold font-serif">Enola Holmes 2</h1>
              <div className="flex items-center text-gray-400 gap-2 font-semibold">
                <span>⭐</span>
                <span>4.8</span>
                <span>|</span>
                <span>Action</span>
                <span>|</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>

  </div>

  </section>

  <header className=' p-8 w pl-16 text-2xl font-semibold  '>Your Watchlist</header>

<div>
<section className=' p-8 pl-5 '>

  <div className=' flex gap-4 overflow-auto ' >
  <div className=' w-[17vw] p-2'>
    <div className=' w-[30vw] bg-w '>
                    <img className=' object-center object-cover rounded-2xl  h-[20vh] w-[17vw]' src="https://preview.redd.it/what-has-happened-to-movie-posters-v0-ujfww6wnnhb81.jpg?width=1000&format=pjpg&auto=webp&s=73af141c8cc8dad6989a41ec7b576d01a69360f5" alt="" />
                    <div className=' p-4 space-y-1'>
                        <h1 className=' text-2xl font-serif '> war on mars</h1>
                       
                         <div className=' flex gap-2 font-serif text-gray-300 text-md'>
                         <span>⭐</span>
                         <h1>4.3</h1>
                            <span>|</span>
                            <h1>Movie</h1>  
                         </div>
                    </div>
                </div>
    </div>    

   
  </div>
</section>
</div>

<header className=' p-8 w pl-16 text-2xl font-semibold  '>Your Likes</header>

<div>
<section className=' p-8 pl-5 '>

  <div className=' flex gap-4 overflow-auto ' >
  <div className=' w-[17vw] p-2'>
    <div className=' w-[30vw] bg-w '>
                    <img className=' object-center object-cover rounded-2xl  h-[20vh] w-[17vw]' src="https://preview.redd.it/what-has-happened-to-movie-posters-v0-ujfww6wnnhb81.jpg?width=1000&format=pjpg&auto=webp&s=73af141c8cc8dad6989a41ec7b576d01a69360f5" alt="" />
                    <div className=' p-4 space-y-1'>
                        <h1 className=' text-2xl font-serif '> war on mars</h1>
                       
                         <div className=' flex gap-2 font-serif text-gray-300 text-md'>
                         <span>⭐</span>
                         <h1>4.3</h1>
                            <span>|</span>
                            <h1>Movie</h1>  
                         </div>
                    </div>
                </div>
    </div>    

   
  </div>
</section>
</div>
  
<div className="relative w-full h-[70vh]">
      <div 
        className="absolute rounded-xl inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://marketplace.canva.com/EAFWZtEkeuE/1/0/1131w/canva-black-and-red-horror-movie-poster-O62lNfSwF8w.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.9))"
          }}
        ></div>
      </div>

      <div className="relative z-10 pt-32 px-16">
        <div className="mt-32">
          <h1 className="text-5xl font-bold text-white mb-4">
            Guardian Of The Galaxy: Volume 3
          </h1>
          
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>★ 4.5</span>
            <span>•</span>
            <span>2h40m</span>
            <span>•</span>
            <span>2023</span>
            <span>•</span>
            <span>Superhero</span>
            <span>•</span>
            <span>Action</span>
          </div>

          <div className="flex space-x-4 mt-8">
            <button className="flex items-center bg-[#03C988] hover:bg-[#02b377] text-white px-6 py-2.5 rounded-md">
              <FaPlayCircle className="mr-2" />
              Play Now
            </button>
            <button className="flex items-center border border-gray-300 text-white px-6 py-2.5 rounded-md hover:bg-white/10">
              <CiBookmark className="mr-2" />
              Add Watchlist
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mt-16">
          {genres.map((genre, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full ${
                genre.active 
                  ? 'bg-[#03C988] text-white' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {genre.name}
            </button>
          ))}
          <button className="px-2 flex items-center justify-center text-white">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div> <Footer /> </div>
      </main>
    </>
  )
}


export default Tracker
