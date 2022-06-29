import React from 'react';
import MatchCard from './match-card'
import './card.css'

const SeriesCard = ({ series, matchType, type, status }) => {
    return (
        <div className='mx-auto my-4 bg-white p-2'>
            <div className='flex items-center bg-white p-2 mx-2 shadow-1 '>
                <p className='uppercase text-xs px-4'>{series?.league.slice(0, 3)}</p>
                <p className='text-xs px-4'>{series?.seriesName}</p>
            </div>
            <div className='flex flex-row justify-start items-center text-center overflow-x-scroll mx-2'>
                {
                    series?.matches.map(
                        (match, index) => <MatchCard key={index} index={index} match={match} matchType={matchType} type={type} status={status} />
                    )
                }
            </div>
        </div>
    );
}

export default SeriesCard;
