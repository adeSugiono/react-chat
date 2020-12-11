import React from 'react';


export default function ItemChat(props) {
    return (

        <div className="container">
            <div className="col-md-0 offset-md-0">
                <ul className="timeline">
                    <li>
                        <h4>{props.name}</h4>
                        <p>{props.chats}</p>
                        <div className="btn btn-outline-light" onClick={() => props.removeChats(props.id)}>delete</div>
                    </li>
                </ul>
            </div>
        </div>


    )
}
