import React from 'react'

const DashbaordBox = (props) => {
  return (
    <>
       <div className="dashboardBox">
        <div className="title">
            <div className="col1">
            <span className='info-title'>{props.title}</span>
            <span className='info-identifier'>{props.identifier}</span>
            </div>
            <div className="col2-icon">
                    {props.icon}
            </div>
        </div>
        <div className="statistic-info d-flex ">
            <span className='cart-mini d-flex' style={{color:`${props.color}`}} >
                <span className=' mb-3'>{props.arrowUp}</span>
                <p>{props.statis}</p>
            </span>
            <p className='last'>last month</p>
        </div>
       </div>
    </>
  )
}

export default DashbaordBox
