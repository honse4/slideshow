'use client'
import React, {useState} from 'react'

interface props {
    data: {posts: [any]};
    num: number

}

function Title(props: props) {
    const [showTitle, changeTitle] = useState(true);

  return (
    <div>
    {showTitle ? <div className='h-16 z-50 absolute bg-black opacity-85'>
            <p className='z-10 pt-2 pb-1 pl-5 pr-5 text-lg'>{props.data?.posts[props.num]?.title}</p>

            <button type='button' className='absolute right-1 bottom-0 text-2xl' onClick={() => changeTitle(preVal => preVal ? false : true) }>-</button>
            </div> : 
            <button type='button' className='absolute z-50 text-2xl' onClick={() => changeTitle(preVal => preVal ? false : true) }>+</button>
             }
             </div>
  )
}

export default Title