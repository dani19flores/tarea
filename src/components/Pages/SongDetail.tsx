import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

interface ReleaseDetails {
    id: string;
    title: string;
    status?: string;
    date?: string;
    country?: string;
    barcode?: string;
    "track-count"?: number;
    "artist-credit": {
        name: string;
        artist: {
            id: string;
            name: string;
            "sort-name": string;
            disambiguation?: string;
        };
    }[];
    "label-info"?: {
        label: {
            id: string;
            name: string;
        };
    }[];
    media?: {
        id: string;
        format: string;
        "track-count": number;
        "disc-count": number;
    }[];
}

interface AlbumDetailResponse {
    album: ReleaseDetails[] | null;
}

function SongDetail() {
    const { id } = useParams<{ id: string }>();

    const url = id
        ? `https://musicbrainz.org/ws/2/release/${id}?fmt=json&inc=recordings+artists+labels`
        : null;

    const { data, loading, error } = useFetch<ReleaseDetails>(url);

    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No se encontraron detalles</p>;

    return (
        <div>
        <h2>{data.title}</h2>
        <p>👤 Artista: {data["artist-credit"][0]?.name}</p>
        <p>📅 Lanzamiento: {data.date}</p>
        <p>🌍 País: {data.country}</p>
        <p>💽 Formato: {data.media?.map((m) => m.format).join(", ")}</p>
        <p>🎶 Canciones: {data["track-count"]}</p>
        <p>🏷️ Sello: {data["label-info"]?.map((l) => l.label.name).join(", ")}</p>
        </div>
    );
}

export default SongDetail;
