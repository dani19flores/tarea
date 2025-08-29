import React, { useState } from "react";
import "./css/style.css";

interface Props {
    onSearch: (artist: string) => void;
}

function SearchBar({ onSearch }: Props) {
    const [artist, setArtist] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (artist.trim() !== "") {
            onSearch(artist);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Busca un artista..."
            />
            <button type="submit">Buscar</button>
        </form>
    );
}

export default SearchBar;
