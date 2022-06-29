import React from 'react';

const MatchCard = ({ index, match, matchType, type, status }) => {
    console.log(match)
    return (
        <div className='shadow-1 p-4 m-2 w-80'>
            <div className='flex w-full'>
                <p>{index + 1} - {matchType}</p>
                <span>{type}</span>
            </div>
            <div className='flex'>
                <div>
                    {match?.matchScore[0].teamShortName}
                    {
                        match?.matchScore[0].teamScore.map(score => <p>{score?.runsScored}/{score?.wickets} ({score?.overs})</p>)
                    }
                </div>
                <div>{matchType}</div>
                <div>
                    {match?.matchScore[1].teamShortName}
                    {
                        match?.matchScore[1].teamScore.map(score => <p>{score?.runsScored}/{score?.wickets}</p>)
                    }
                </div>
            </div>
        </div>
    );
}

export default MatchCard;
