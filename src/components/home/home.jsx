import React, { useState } from 'react'
import { useQuery, gql } from "@apollo/client"
import './home.css'
import SeriesCard from '../card/series-card'

const Home = () => {
    const [type, setType] = useState('live')
    const [status, setStatus] = useState('All')

    const MATCHES_QUERY = gql`
query schedule {
    newSchedule(type: "${status}", status: "${type}", page: 1) {
    matches {
        teamsWinProbability {
        homeTeamShortName
        homeTeamPercentage
        awayTeamShortName
        awayTeamPercentage
        tiePercentage
        }
        matchScore {
            teamShortName
            teamFullName
            teamID
            teamScore {
            inning
            inningNumber
            battingTeam
            runsScored
            wickets
            overs
            runRate
            battingSide
      	    teamID
            battingTeamShortName
            declared
            folowOn
            } 
        }
    }
    seriesID
    matchType
    seriesName
    seriesView
    league
    seriesAvailable
    }
}
`;
    const { data, loading, error } = useQuery(MATCHES_QUERY);
    console.log(data?.newSchedule)

    return (
        <div className='w-full font-sans bg-gray-300 min-h-screen'>
            <div className='bg-navy w-full'>
                <h1 className='text-xl font-bold text-white p-3'>Schedule</h1>
                <div className='grid grid-cols-3 justify-between items-center uppercase text-gray-400'>
                    <div
                        className={`flex justify-center items-center p-2 font-semibold text-xs cursor-pointer border-b-2 ${type === 'upcoming' && 'border-red-500 text-white'}`}
                        onClick={() => { setType('upcoming') }}
                    >
                        <p>Upcoming</p>
                    </div>
                    <div
                        className={`flex justify-center items-center p-2 font-semibold text-xs cursor-pointer border-b-2 ${type === 'live' && 'border-red-500 text-white'}`}
                        onClick={() => { setType('live') }}
                    >
                        <p>Live</p>
                        <span className='bg-green-600 h-2 w-2 rounded-full ml-2'></span>
                    </div>
                    <div
                        className={`flex justify-center items-center p-2 font-semibold text-xs cursor-pointer border-b-2 ${type === 'completed' && 'border-red-500 text-white'}`}
                        onClick={() => { setType('completed') }}
                    >
                        <p>Results</p>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='bg-black-10 grid grid-cols-3 mx-auto w-11/12 rounded-2xl text-black uppercase'>
                    <div className={`flex justify-center items-center p-2 rounded-2xl font-light text-xs ${status === 'All' && 'text-red-600 bg-white'}`}
                        onClick={() => { setStatus('All') }}
                    >
                        All
                    </div>
                    <div className={`flex justify-center items-center p-2 rounded-2xl font-light text-xs ${status === 'International' && 'text-red-600 bg-white'}`}
                        onClick={() => { setStatus('International') }}
                    >
                        International
                    </div>
                    <div className={`flex justify-center items-center p-2 rounded-2xl font-light text-xs ${status === 'Domestic' && 'text-red-600 bg-white'}`}
                        onClick={() => { setStatus('Domestic') }}
                    >
                        Domestic
                    </div>
                </div>
            </div>

            {
                data?.newSchedule.map(
                    series => <SeriesCard key={series?.seriesId} series={series} matchType={series?.matchType} type={type} status={status} />
                )
            }
        </div>
    );
}

export default Home;