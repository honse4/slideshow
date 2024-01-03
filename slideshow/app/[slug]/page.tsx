'use client'
import Display from '@/components/Display';
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
    const [showTitle, changeTitle] = useState(true);

    const { data, error, isLoading } = useSWR(`/${params.slug}/api`,fetcher);
    
      if (error) return "An error has occurred.";
      if (isLoading) return "Loading...";
      console.log(data);
      
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


      return (
        <div className='h-svh'>
          {showTitle ? <div className=' z-50 absolute'>
                <button className='z-50 ' type='button' onClick={() => {setNumber(preCount => preCount+=1)}}> click me</button>
            <p className='z-10'>{data?.posts[number]?.title}</p>
            <button type='button' className='absolute' onClick={() => changeTitle(preVal => preVal ? false : true) }>+</button>
            </div> : <button type='button' className='absolute' onClick={() => changeTitle(preVal => preVal ? false : true) }>+</button> }
            
            
            
           <div className='flex flex-col h-screen items-center p-0 m-0'>
           <Display data={data} num={number} />

          </div> 
            
        </div>
      );
}

export default page
