'use client'
import DirectionButtons from '@/components/DirectionButtons';
import Display from '@/components/Display';
import Navigator from '@/components/Navigator';
import Title from '@/components/Title';
import React, {useEffect, useState, memo, cache} from 'react'
import useSWRImmutable from 'swr'


const fetcher = async (url:string) => fetch(url).then((res) => {
  console.log(1);
    return res.json()
} );

const funcer = (data : {posts: [any]})=> {
  //@ts-ignore
  const filter: [any] = data?.posts.filter((obj)  => {
    console.log(99)
    return domains.includes(obj?.domain) === false && obj?.distinguished !== 'moderator' && obj?.is_self !== true && obj?.post_hint !== 'link';
  })
  return filter;
}
const dataConst = cache(funcer);

const domains = ['self.nsfw', 'youtube.com','i.redgifs.com','youtu.be'];




const page = memo(function page({params }: {params:{slug: string}}) {
  
    const [number, setNumber] = useState(0);

    const { data, error, isLoading } = useSWRImmutable(`/${params.slug}/api`,fetcher);

    const dataPls = data;
    const filterData = {
      posts: dataConst(dataPls)
    };

    // const handleClick = (id: number) => {
    //   setNumber(id);
    // }

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
    

      return (
        <div className='h-svh bg-black'>
          <Title data={filterData} num={number} />
            
          <DirectionButtons data={filterData} setVal={setNumber} />
            
            
          <div className='flex flex-col h-screen items-center bg-black p-0 m-0'>
          <Display data={filterData} num={number} setVal={setNumber} />
          </div>

             <Navigator data={filterData} num={number} setVal={setNumber} />
           </div>

      );
})

export default page
