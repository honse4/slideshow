'use client'
import Display from '@/components/Display';
import React, {useState} from 'react'
import useSWRImmutable from 'swr'
const snoowrap = require('snoowrap');

const bots = new snoowrap({
    userAgent : 'Honse-bot',
    clientId : 'CgJGpw88dN3vTqk1QRHBSQ',
    clientSecret : '7R7pDq55Bf2Jaz2oepagT6smnrbysw',
    refreshToken : '66857249118250-iTCPuqRiuDeAk9K8f67HYD2JSewtGw'
});

const fetcher = async (url:string) => fetch(url).then((res) => {
  console.log(1);
    return res.json()
} );

const domains = ['self.nsfw', 'youtube.com','i.redgifs.com'];

function page({params }: {params:{slug: string}}) {

    const [number, setNumber] = useState(0);
    const [showTitle, changeTitle] = useState(true);

    const { data, error, isLoading } = useSWRImmutable(`/${params.slug}/api`,fetcher);
     
    const setter = () => {
      setNumber(preVal => preVal>0 ? preVal-1 : preVal+0);
      return (
        <div className='h-screen bg-black'></div>
      )
    }
      if (error) return "An error has occurred.";
      if (isLoading) return "Loading...";

      if(data?.posts === undefined) return (
        <div className='flex flex-col bg-black items-center justify-center h-screen'>
          <div className='flex flex-col bg-black items-center justify-center'>
            <p className='font-bold pb-2'>Invalid URL. Check one of the following: </p>
            <ul>
              <li>The subreddit doesnt exist</li>
              <li>There is a spelling mistake</li>
              <li>The subreddit does not have valid image/video links</li>
            </ul>
          </div>
        </div>
      );

      //@ts-ignore
      const filter = data?.posts.filter((obj)  => {
        return domains.includes(obj?.domain) === false;
      })

      const filterData = {
        posts: filter
      };

      return (
        <div className='h-svh bg-black'>
          {showTitle ? <div className='h-14 z-50 absolute bg-black opacity-70'>
            <p className='z-10 p-1 pl-2 pr-2 text-lg'>{filterData?.posts[number]?.title}</p>

            <button type='button' className='absolute right-1 bottom-0 text-xl' onClick={() => changeTitle(preVal => preVal ? false : true) }>+</button>
            </div> : 
            <button type='button' className='absolute z-50 text-xl' onClick={() => changeTitle(preVal => preVal ? false : true) }>+</button>
             }
            
            <div className='fixed top-80 z-40'>
              <button type='button' onClick={() => setNumber(preVal => preVal>0 ? preVal-1 : preVal+0)} className='z-50 absolute'>

              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
             <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
             </svg>

           </button>
            </div>

            <div className='fixed top-80 z-40 right-12'>
              <button type='button' onClick={() => setNumber(preVal => preVal<filterData.posts.length ? preVal+1 : preVal+0)} className='z-50 absolute'>

              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
              </svg>

           </button>
            </div>
            
            
           <div className='flex flex-col h-screen items-center bg-black p-0 m-0'>
           <Display data={filterData} num={number} />
           </div>

           <div>

           </div>
          </div> 

      );
}

export default page
