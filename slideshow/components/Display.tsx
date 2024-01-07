'use client'
import React, {useState, useEffect} from 'react';

interface props {
    data: {posts: [any]};
    num: number
    setVal: React.Dispatch<React.SetStateAction<number>>
}



function Display(props: props) {

    useEffect(() => {
      const handleKeyDown = (e : KeyboardEvent) => {
        if (e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            e.preventDefault();
          props.setVal(preVal => preVal<props.data.posts.length-1 ? preVal+1 : preVal+0)
        }
        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault();
            props.setVal(preVal => preVal>0 ? preVal-1 : preVal+0)
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    const displayer = () => {

        if(props.data?.posts[props.num]?.post_hint === 'image') {

            if(props.data?.posts[props.num]?.domain !== 'reddit.com') {
                return (
                <img className='h-svh' src={props.data.posts[props.num]?.url}></img>
                )
            }
            else{
                
                if(props.data?.posts[props.num]?.gallery_data?.items[0]?.media_id && props.data?.posts[props.num]?.media_metadata !== null) {
                    const val  = props.data?.posts[props.num]?.gallery_data?.items[0]?.media_id
                    return(
                        <img className='h-svh' src={props.data?.posts[props.num]?.media_metadata[val].s?.u || props.data?.posts[props.num]?.media_metadata[val].s?.gif}></img> 
                        )
                    }
                else{
                    return (
                            <img className='h-svh' src={props.data.posts[props.num]?.url}></img>
                    )
                    }
            }
    
        }

        else if(props.data?.posts[props.num]?.post_hint === 'rich:video' || props.data?.posts[props.num]?.post_hint === 'hosted:video' ){
           if(props.data?.posts[props.num]?.domain?.includes('redgifs.com') ) {
               return (
                <iframe scrolling='no' frameBorder={0} allowFullScreen className='h-svh w-screen'src={props.data?.posts[props.num]?.url.replace("watch",'ifr')} />
               )
           }
        
           else if(props.data?.posts[props.num]?.media !== null) {
               return (
                <div className='bg-black h-screen w-screen flex flex-col items-center'>
                <video className='h-svh w-svw' autoPlay controls loop src={props.data.posts[props.num]?.media?.reddit_video?.fallback_url || props.data.posts[props.num]?.url}></video>
                </div>
               )
           }
           else if (!props.data?.posts[props.num]?.preview?.enabled){
               return(
                <div className='bg-black h-screen w-screen flex flex-col items-center'>
                <video  className='h-svh w-svw' autoPlay controls loop src={props.data?.posts[props.num]?.preview?.reddit_video_preview?.fallback_url}></video>
                </div>
               )
           }
           else {
            return (
                <div className='bg-black h-screen w-screen flex flex-col items-center'>
                <video  className='h-svh w-svw' autoPlay controls loop src={props.data.posts[props.num]?.url}></video>
                </div>
            )
           }
       }

        else {

            if(props.data?.posts[props.num]?.domain === 'reddit.com') {
                if(props.data?.posts[props.num]?.gallery_data?.items[0]?.media_id && props.data?.posts[props.num]?.media_metadata !== null) {
                    const val  = props.data?.posts[props.num]?.gallery_data?.items[0]?.media_id
                    return(
                        <img className='h-svh' src={props.data?.posts[props.num]?.media_metadata[val].s?.u || props.data?.posts[props.num]?.media_metadata[val].s?.gif}></img> 
                    )
                }
                else{
                    return (
                        <img className='h-svh' src={props.data.posts[props.num]?.url}></img>
                    )
                }
            }
    }
    }
    //setBool(false);

    return (
        <div className='flex flex-col h-screen bg-black'>
            {displayer()}
        </div>
    )

}

export default Display