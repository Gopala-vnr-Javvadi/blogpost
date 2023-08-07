import React from 'react';
import { useState } from 'react';

const DashboardTiles = () => {

const[cards] = useState([

{   title:'card1',
    content :' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio libero saepe quo excepturi quisquam, dolores doloremque cupiditate adipisciincidunt mollitia'
},
{
    title:'car2',
    content :' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio libero saepe quo excepturi quisquam, dolores doloremque cupiditate adipisciincidunt mollitia'
},
{
    title:'card3',
    content :' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio libero saepe quo excepturi quisquam, dolores doloremque cupiditate adipisciincidunt mollitia'
},

])

return (
    
    <div>
        <section>
            <div className='container'>
                <h1>Responsivve Cards</h1>
                <div className='cards'>
                {
                cards.map((card,i)=>(
               
                 <div key={i} className='card'>
                     <h3>{card.title}</h3>
                      <p>{card.content}</p>
                      <button className='btn'></button>
                 </div>
              

                ))

                }
              
              </div>
            </div>
        </section>
    </div>
);
};

export default DashboardTiles;