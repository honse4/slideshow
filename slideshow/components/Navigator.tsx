import React, { use, useState } from 'react'

interface props {
    data: {posts: [any]};
    num: number
    setVal: React.Dispatch<React.SetStateAction<number>>
}

function Navigator(props: props) {
    const [showFoot, setFoot] = useState(false);
    const handleClick = (id: number) => {
        props.setVal(id);
      }



  return (
    <div>
        {showFoot ? <div className='h-80 left-96 rounded-2xl right-96 z-50 fixed bg-black opacity-75 bottom-0 '>

    <button type='button' className='absolute top-0 left-1/2' onClick={() => setFoot(preVal => preVal ? false : true) }>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
    </button>
    <div className='left-24 right-24 grid grid-cols-4 gap-5 top-16 absolute'>
        <a className='text-lg w-4 text-red-500'href={`https://www.reddit.com/r/${props?.data?.posts[0]?.subreddit}`}>Subreddit</a>
        <a className='text-lg w-4 text-red-500'href={`https://www.reddit.com/r/${props?.data?.posts[props.num]?.permalink}`}>Post</a>
    </div>
    <div className='grid grid-cols-10 gap-3 bottom-1.5 absolute left-40 right-40 top-28 pr-4 overflow-y-auto'>
    {props.data?.posts.map((elem, idx) => (
      <div onClick={()=>handleClick(idx)} className='text-white text-sm cursor-pointer h-6 w-6 flex items-center justify-center rounded-md hover:bg-slate-400'key={idx}>{idx+1}</div>
    ))}
    </div>
    </div> 
    : 
    <div className='h-10 absolute items-center bottom-32 left-0 z-50'>
    <button type='button' className='z-50 ' onClick={() =>  setFoot(preVal => preVal ? false : true) }>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>
    </button>
    </div>
     }
     </div>
  )
}

export default Navigator