import React, { useEffect } from 'react'

function Home() {
     useEffect(() => {
          location.replace("https://www.kartavyahealtheon.com/")
     }, [])
     return (
          <div>Loading...</div>
     )
}

export default Home