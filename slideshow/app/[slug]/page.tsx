'use client'
import React, {useState} from 'react'
import useSWR from 'swr'
const snoowrap = require('snoowrap');

const bots = new snoowrap({
    userAgent : 'Honse-bot',
    clientId : 'CgJGpw88dN3vTqk1QRHBSQ',
    clientSecret : '7R7pDq55Bf2Jaz2oepagT6smnrbysw',
    refreshToken : '66857249118250-iTCPuqRiuDeAk9K8f67HYD2JSewtGw'
});

const fetcher = async (url:string) => fetch(url).then((res) => {
    return res.json()
} );

function page({params }: {params:{slug: string}}) {

    const [number, setNumber] = useState(0);

    const { data, error, isLoading } = useSWR(`/${params.slug}/api`,fetcher);
    
      if (error) return "An error has occurred.";
      if (isLoading) return "Loading...";
      console.log(data);
      

      return (
        <div className='flex flex-col h-svh'>
            <div className='w-4 h-1 z-10 m-0 p-0'>
                <button onClick={() => {console.log(number);setNumber(preCount => preCount+=1)}}> click me</button>
            <p>{data.posts[number].title}</p>
            </div>
            
           <div className='flex-col h-screen items-center p-0 m-0'>

           {
            data.posts[number].media !== null ? 
             <video className='h-svh w-svw' autoPlay controls loop src={data.posts[number].media.reddit_video.fallback_url}></video>
              : <div className='flex flex-col items-center h-screen'>{data.posts[number].domain === 'reddit.com' ? <img className='h-svh' src={data.posts[number].thumbnail}></img> : !data.posts[number].preview.enabled ? <video className='h-svh w-svw' autoPlay controls loop src={data.posts[number].preview.reddit_video_preview.fallback_url}></video>
            :<img className='h-svh' src={data.posts[number].url}></img>}
            </div> }
          </div> 
            
        </div>
      );
}

export default page
