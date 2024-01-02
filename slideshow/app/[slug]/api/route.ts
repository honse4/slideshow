import { NextResponse } from "next/server"
const snoowrap = require('snoowrap');

const bot = new snoowrap({
    userAgent : 'Honse-bot',
    clientId : 'CgJGpw88dN3vTqk1QRHBSQ',
    clientSecret : '7R7pDq55Bf2Jaz2oepagT6smnrbysw',
    refreshToken : '66857249118250-iTCPuqRiuDeAk9K8f67HYD2JSewtGw'
});

export const GET = async (request: Request, {params }: {params:{slug: string}}) => {
    const slug = params.slug
        const posts = await bot.getHot(slug, { limit: 100 })
        .catch( (err: Error)=> {
       console.log(err);
    })
    return NextResponse.json({posts});
    
}