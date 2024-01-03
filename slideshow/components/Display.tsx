import React, { Dispatch, SetStateAction } from 'react'

interface props {
    data: {posts: [any]};
    num: number

}

function Display(props: props) {
    
    if(props.data?.posts[props.num]?.domain === 'reddit.com') {
        return (
            <h1>sorry</h1>
        )
    }
    else if(props.data?.posts[props.num].media !== null) {
        return (
            <video className='h-svh w-svw' autoPlay controls loop src={props.data.posts[props.num].media?.reddit_video?.fallback_url || props.data.posts[props.num].url}></video>
        )
    }
    else if (!props.data?.posts[props.num]?.preview.enabled){
        return(
            <video className='h-svh w-svw' autoPlay controls loop src={props.data?.posts[props.num]?.preview.reddit_video_preview?.fallback_url}></video>
        )
    }
    else {
        return (
            <img className='h-svh' src={props.data.posts[props.num].url}></img>
        )
}
}

export default Display