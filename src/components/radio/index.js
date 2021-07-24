import React, { useState, useEffect } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';

import defaultImage from '../../global.png';
const RadioPlayer = () => {
   const [stations, setStations] = useState();
   const [stationFilter, setStationFilter] = useState('all');

   useEffect(() => {
      setupApi(stationFilter).then((data) => {
         setStations(data);
      });
   }, [stationFilter]);
   const setupApi = async (stationFilter) => {
      const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');
      const stations = await api
         .searchStations({
            language: 'english',
            tag: stationFilter,
            limit: 30,
         })
         .then((data) => {
            return data;
         });

      return stations;
   };

   const filters = [
      'all',
      'classical',
      'country',
      'dance',
      'disco',
      'house',
      'jazz',
      'pop',
      'rap',
      'retro',
      'rock',
   ];

   const setDefaultSrc = (event) => {
      event.target.src = defaultImage;
   };

   const Filters = styled.div`
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      width: 100%;
      padding: 3rem 0;
      color: white;

      span {
         margin: 0.25em;
         border: 1px solid #ef9f15;
         border-radius: 10px;
         padding: 0.25em 0.75em;

         &:hover {
            cursor: pointer;
            background: #ef9f15;
         }
      }

      .selected {
         background: #ef9f15;
      }
   `;

   return (
      <RadioContainer className='radio'>
         <h1>Radio Stations</h1>

         <Filters className='filters'>
            {filters.map((filter, index) => (
               <span
                  key={index}
                  className={stationFilter === filter ? 'selected' : ''}
                  onClick={() => setStationFilter(filter)}
               >
                  {filter}
               </span>
            ))}
         </Filters>
         <Container>
            <Stations className='stations'>
               {stations &&
                  stations.map((station, index) => {
                     return (
                        <Station className='station' key={index}>
                           <div className='stationName'>
                              <img
                                 className='logo'
                                 src={station.favicon}
                                 alt='station logo'
                                 onError={setDefaultSrc}
                              />
                              <div className='name'>{station.name}</div>
                           </div>
                           <AudioPlayer
                              className='player'
                              src={station.urlResolved}
                              showJumpControls={false}
                              layout='stacked'
                              customProgressBarSection={[]}
                              customControlsSection={[
                                 'MAIN_CONTROLS',
                                 'VOLUME_CONTROLS',
                              ]}
                              autoPlayAfterSrcChange={false}
                           />
                        </Station>
                     );
                  })}
            </Stations>
         </Container>
      </RadioContainer>
   );
};
const RadioContainer = styled.div`
   margin: 50px auto;
   h1 {
      text-align: center;
      color: white;
      font-size: clamp(1.5rem, 4vw, 3.5rem);
      text-transform: uppercase;
      letter-spacing: 5px;
   }
`;
const Container = styled.div`
   margin: 10px auto;
   width: 90%;
`;
const Stations = styled.div`
   display: grid;
   grid-gap: 0.5rem;
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   place-content: center;
`;
const Station = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-evenly;
   /* width: 150px; */
   height: 200px;
   margin: 40px auto;
   font-size: 0.7rem;
   border: 1px solid rgb(76, 62, 95);
   margin: 0.25em;
   border-radius: 10px;
   padding: 1em;
   transition: all 300ms ease-in-out;
   &:hover {
      transform: scale(1.01);
      box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.5);
   }

   .stationName {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: start;
      img {
         width: 100px;
      }
      .name {
         width: 100%;
         text-align: center;
         color: #fff;
         padding: 0.5rem 0;

         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
      img {
         display: block;
         width: 4em;
         height: 4em;
         border-radius: 50%;
         border: 4px solid rgb(76, 62, 95);
         margin: 0 0.25em;
      }

      audio {
         width: 100%;
      }
   }
`;

export default RadioPlayer;
