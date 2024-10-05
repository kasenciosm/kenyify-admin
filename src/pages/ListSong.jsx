import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { url } from "../server/Server";

function ListSong() {

  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}api/song/list`)

      if(response.data.success) {
        setData(response.data.songs)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}api/song/remove`,{id});

      if(response.data.success){
        toast.success(response.data.message);
        await fetchSongs();
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchSongs();
  },[])

  return (
    <section>
      <p>All Songs List</p>
      <br/>
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 mr-5">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item,index )=> {
            return (
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
                <img className="w-12" src={item.image} alt="song image" />
                <p>{item.name}</p>
                <p>{item.album}</p>
                <p>{item.duration}</p>
                <p className="cursor-pointer text-xs text-slate-900 border rounded-md bg-slate-200 w-min px-1.5 py-0.5 hover:text-red-600 hover:bg-red-200 hover:border-red-900 group-hover:border-red-600 hover:font-semibold" 
                  onClick={()=>removeSong(item._id)}
                >
                  Remove
                </p>
              </div>
            )
        })}
      </div>
    </section>
  )
}

export default ListSong
