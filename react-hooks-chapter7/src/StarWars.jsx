import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Characters({ searchTerm }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        axios.get(`https://swapi.py4e.com/api/people/?search=${searchTerm}`) // fixed: added backticks
            .then((res) => {
                setData(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API Error:", err.message);
                setLoading(false);
            });
    }, [searchTerm]); // fixed: added missing comma

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {data.length > 0 ? (
                data.map((item) => (
                    <div key={item.name}>{item.name}</div>
                ))
            ) : (
                <div>No results found.</div>
            )}
        </div>
    );
}

function StarWars() {
    const [searchTerm, setSearchTerm] = useState("luke");

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>🌌 Star Wars Characters</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search characters..."
                style={{ marginBottom: "10px", padding: "5px" }}
            />
            <Characters searchTerm={searchTerm} />
        </div>
    );
}

export default StarWars;

