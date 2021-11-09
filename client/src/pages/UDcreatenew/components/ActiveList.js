import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const ActiveList = () => {

    const data = useSelector((state) => {return state.UserListings});
    console.log("data", data)

    if(data)
    return (
        <div id="active-list">
                    <header><h2>Active Listings</h2></header>
                    <div id="listing-box">
                        {data.map((elem,index) => (
                            <div className="CN-listing" key={index}>
                            <div className="CN-sn">{index+1}</div>
                            <div className="CN-amount">{elem.rate + " " + elem.currency}</div>
                            <div className="CN-days">{elem.minP+"-"+elem.maxP}</div>
                            <div className="CN-more"><button><Icon icon="bx:bx-dots-horizontal-rounded" color="black" height="34" /></button></div>
                            </div>
                        ))
                        }
                    </div>
        </div>
    )
    else 
        return (
            <div id="active-list">
                    <header><h2>Active Listings</h2></header>
                    <div id="empty-message">You don't have any active listings right now.</div>
        </div>
        )
}

export default ActiveList;