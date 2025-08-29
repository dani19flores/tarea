import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import SearchBar from "../SearchBar";
import "./style";


interface ArtistCredit {
    name: string;
    artist: {
        id: string;
        name: string;
        "sort-name": string;
        disambiguation?: string;
    };
}


interface Release {
    id: string;
    score: number;
    "status-id"?: string;
    "packaging-id"?: string;
    "artist-credit-id"?: string;
    count?: number;
    title: string;
    status?: string;
    packaging?: string;
    "text-representation"?: {
        language?: string;
        script?: string;
    };
    "artist-credit": {
        name: string;
        artist: {
            id: string;
            name: string;
            "sort-name": string;
            disambiguation?: string;
        };
    }[];
    "release-group"?: {
        id: string;
        "type-id"?: string;
        "primary-type-id"?: string;
        title: string;
        "primary-type"?: string;
        "secondary-types"?: string[];
        "secondary-type-ids"?: string[];
    };
    date?: string;
    country?: string;
    "release-events"?: {
        date?: string;
        area?: {
            id: string;
            name: string;
            "sort-name": string;
            "iso-3166-1-codes": string[];
        };
    }[];
    barcode?: string;
    "label-info"?: {
        label: {
            id: string;
            name: string;
        };
    }[];
    "track-count"?: number;
    media?: {
        id: string;
        format?: string;
        "disc-count"?: number;
        "track-count"?: number;
    }[];
}

interface Release {
    created: string;
    offset: number;
    "artist-credit": ArtistCredit[];
    releases: Release[];
}

interface SearchAlbumResponse {
    releases: Release[];
}

function SearchPage() {
    const [artist, setArtist] = useState<string>("");
    const url =
        artist !== ""
            ? `https://musicbrainz.org/ws/2/release/?query=artist:${artist}&fmt=json`
            : null;

    const { data, loading, error } = useFetch<SearchAlbumResponse>(url);

    return (
        <div className="search-page">
            <h1>Biblioteca Musical</h1>
            <SearchBar onSearch={setArtist} />

            {loading && <p className="loading">Cargando datos...</p>}
            {error && <p className="error">Error: {error}</p>}

            <div className="releases-grid">
                {data?.releases?.map((r) => (
                    <div key={r.id} className="release-card">
                        <img
                            className="release-cover"
                            alt={r.title}
                            onError={(e) =>
                                (e.currentTarget.src = "/placeholder.jpg")
                            }
                            src={`https://coverartarchive.org/release/${r.id}/front-250`}
                        />
                        <div className="release-info">
                            <h3>{r.title}</h3>
                            <p>🎤 {r["artist-credit"][0]?.name}</p>
                            <Link to={`/song/${r.id}`} className="details-link">
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
