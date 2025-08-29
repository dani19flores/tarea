import { useEffect, useState } from "react";
import axios from "axios";

type Music = {
    idAlbum: number;
    idArtist: number;
    strAlbum: string;
    strArtist: string;
    intYearReleased:string;
    strStyle: string;
    strAlbumThumb: string;
    strDescriptionEN: string;
}

type FetchMusicsState = {
    music:Music[];
    isLoading:boolean;
    error:string|null;
}

const useFetchMusic = (artist_name:string) => {
    const [musicState,setMusicState] = useState<FetchMusicsState>({music:[],isLoading:true,error:null});

    useEffect(() => {
        const fetchMusic= async () => {
            try{
                const response = await axios.get(`https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${artist_name}`);
                console.log(response.data.album)
                setMusicState({music:response.data.album,isLoading:false,error:null});
            }catch (error){
                setMusicState({music:[],isLoading:false,error:`fail to fetch`});
            }
        };
        
        fetchMusic()
    },[]);

    return musicState;
}

export default useFetchMusic;