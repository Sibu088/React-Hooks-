import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

function StarWars() {
    const [searchTerm, setSearchTerm] = useState("luke")
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}
`)
                setCharacters(response.data.result || [])  // swapi.tech returns `result`
                setError(null)
            } catch (err) {
                setError("Failed to fetch data. Check your internet or API status.")
            }
            setLoading(false)
        }

        fetchData()
    }, [searchTerm])

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Star Wars Character Search</h2>
            <input
                type="text"
                value={searchTerm}
                placeholder="Search for Star Wars characters"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
            />
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <ul>
                    {characters.map((character) => (
                        <li key={character.uid}>{character.properties.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default StarWars
