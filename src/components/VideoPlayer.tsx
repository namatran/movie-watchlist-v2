"use client"
// ENTIRELY CLAUDE AI

import { useState } from "react";

export default function VideoPlayer({ videos }) {
  let youtubeVideos = videos?.results?.filter(v => v.site === "YouTube") || [];
  
  // Sort: Official/Main first, then Trailer, then Teaser, then others
  const sortedVideos = youtubeVideos.sort((a, b) => {
    const aIsOfficial = a.name.toLowerCase().includes("official") || a.name.toLowerCase().includes("main");
    const bIsOfficial = b.name.toLowerCase().includes("official") || b.name.toLowerCase().includes("main");
    
    if (aIsOfficial && !bIsOfficial) return -1;
    if (!aIsOfficial && bIsOfficial) return 1;
    
    const typeOrder = { "Trailer": 0, "Teaser": 1 };
    const aOrder = typeOrder[a.type] ?? 999;
    const bOrder = typeOrder[b.type] ?? 999;
    return aOrder - bOrder;
  });
  
  const [selectedVideo, setSelectedVideo] = useState(sortedVideos[0]);

  if (sortedVideos.length === 0) return null;

  return (
    <div className="text-white flex-1">
      {sortedVideos.length > 1 && (
        <select 
          value={selectedVideo?.key} 
          onChange={(e) => {
            const video = sortedVideos.find(v => v.key === e.target.value);
            setSelectedVideo(video);
          }}
          className="mb-4 p-2 bg-gray-700 text-white rounded w-full"
        >
          {sortedVideos.map(video => (
            <option key={video.id} value={video.key}>
              {video.name}
            </option>
          ))}
        </select>
      )}

      {selectedVideo && (
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.key}`}
            title={selectedVideo.name}
            allowFullScreen={true}
            className="absolute inset-0 w-full h-full rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
}