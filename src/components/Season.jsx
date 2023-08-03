// import React, { useState, useEffect } from 'react';

import { useEffect, useState } from "react";

export default function Seasons(prop) {

  const [showSeasons, setShowSeasons] = useState(null)

  useEffect(() => {
    if (prop.id) {
      fetch(`https://podcast-api.netlify.app/id/${prop.id}`)
        .then(response => response.json())
        .then(data => {
          const seasons = data.seasons

          const seasonsdata = seasons.map((item) => {
            return (
              <>
                <p className="text-color">{item.title}</p>
                <img className="card--image" src={item.image}></img>
              </>
            )
          })

          setShowSeasons(seasonsdata)
        })
    }
  }, [prop.id])

  return (
    <div className="card-container">
      {showSeasons && showSeasons.map((season, index) => (
        <div key={index} className="card">
          {season}
        </div>
      ))}
    </div>
  );
}
