import React from 'react';
import Navbar from './Navbar';
import { FaPlayCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

const Home = () => {
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
 
 <div className='translate-y-14   flex  space-x-1 pr-6'>
    <div className='bg-gray-500  w-2.5 h-2.5 rounded-full'></div>
    <div className='bg-gray-500  w-2.5 h-2.5 rounded-full'></div>
    <div className='bg-gray-500  w-2.5 h-2.5 rounded-full'></div>
    <div className='bg-gray-500  w-2.5 h-2.5 rounded-full'></div>
    <div className='bg-gray-500  w-2.5 h-2.5 rounded-full'></div>
    <div className='bg-gray-500  w-2.5 h-2.5 rounded-full'></div>

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

<header className=' p-8 w pl-16 text-2xl font-semibold '>Just Releases</header>
<section className=' flex overflow-auto  p-8 pl-16'>
    <div >
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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

<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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
<div className=' pl-3'>
  <div className='w-64 h-80 rounded-lg'>
    {poster.map((img, hey) => (
      <div key={hey} className='relative w-full h-full rounded-lg overflow-hidden'>
        <img
          style={{ opacity: 1, zIndex: -1 }}
          className='rounded-lg w-full h-full object-cover'
          src={img}
          alt="poster"
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg'>
          <div className='absolute bottom-4 left-4 text-white'>
            <h1 className='text-xl font-semibold font-serif'>Enola Holmes 2</h1>
            <div className='flex items-center text-gray-400 gap-2 font-semibold'>
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

<header className=' p-8 w pl-16 text-2xl font-semibold '>Popular of the week</header>
<section className=' p-8 pl-16 '>
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


<section className=' border w-full h-[60vh] p-8 pl-16'>
    
</section>
      </main>
    </>
  );
};

export default Home;
