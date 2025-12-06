import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const CoverageArea = () => {
    const position = [23.8103, 90.4125];
    const data = useLoaderData()
    const mapRef = useRef(null)
    // console.log(data)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value;
        const district = data.find(c=>c.district.toLowerCase().includes(location.toLowerCase()))

        if(district)
        {
            const coord = [district.latitude, district.longitude] 
            // console.log(district, coord)
            mapRef.current.flyTo(coord, 14)
        }
    }

    return (
        <div className='  w-3/4 mx-auto'>

            <h2 className='text-3xl'>We are available in 64 areas</h2>
            <form onSubmit={handleSearch}>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input name='location' type="search" required placeholder="Search" />
                </label>
            </form>
            <MapContainer 
            center={position} 
            zoom={7} 
            scrollWheelZoom={false} 
            className='h-[400px]'
            ref={mapRef} 
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    data.map((service, index) =>
                        <Marker
                            key={index}
                            position={[service.latitude, service.longitude]}>
                            <Popup>
                                Available area <br />
                                {service.district} <br />
                                {service.covered_area.join(', ')}
                            </Popup>
                        </Marker>
                    )
                }
            </MapContainer>,
        </div>
    );
};

export default CoverageArea;