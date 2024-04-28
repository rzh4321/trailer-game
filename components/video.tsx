import { Button } from "./ui/button"

export default function Video({videoId, movieName} : {videoId: string; movieName: string}) {
    console.log(`https://www.youtube.com/embed/${videoId}`)
    return (
        <div className="flex justify-between items-start max-w-6xl mx-auto gap-20 p-5">
            <div className="video-wrapper flex-grow pr-5 relative pt-[56.25%]">
            {/* <h1>{obj.movieName} - critic: {obj.criticScore}, audience: {obj.audienceScore}</h1> */}
                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${videoId}`} title={movieName} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="sidebar w-72 flex-shrink-0 flex self-center flex-col gap-10">
                <p>Additional content here</p>
                <p>sup</p>
            </div>
        </div>
    )
    
}