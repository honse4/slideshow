'use client'
import React, {useState} from 'react';

interface props {
    data: {posts: [any]};
    num: number

}



function Display(props: props) {
    const [loading, setBool] = useState(false);
    console.log(props.data)
    console.log(props.num);
    //setBool(true);

    const displayer = () => {
        if(loading) {
            return <div>loading</div>
        }

        if(props.data?.posts[props.num]?.domain.includes('redgifs.com') ) {
            return (
                <iframe allowFullScreen className='h-svh w-svw'src={props.data?.posts[props.num]?.url.replace("watch",'ifr')} />
            )
        }
        
        else if(props.data?.posts[props.num]?.media !== null) {
            return (
                <div className='bg-black h-screen w-screen flex flex-col items-center'>
                <video className='h-svh w-svw' autoPlay controls loop src={props.data.posts[props.num]?.media?.reddit_video?.fallback_url || props.data.posts[props.num]?.url}></video>
                </div>
            )
        }

        else if(props.data?.posts[props.num]?.domain === 'reddit.com') {
            if(props.data?.posts[props.num]?.gallery_data?.items[0]?.media_id && props.data?.posts[props.num]?.media_metadata !== null) {
                const val  = props.data?.posts[props.num]?.gallery_data?.items[0]?.media_id
                return(
                    <img className='h-svh' src={props.data?.posts[props.num]?.media_metadata[val].s?.u}></img> 
                )
            }
            else{
                return (
                    <img className='h-svh' src={props.data.posts[props.num]?.url}></img>
                )
            }
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
                    <img className='h-svh' src={props.data.posts[props.num]?.url}></img> 
                    </div>
            
                
            )
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