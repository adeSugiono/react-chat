import React from 'react';
import ItemChat from './ItemChat'

export default function ListChat(props) {
    let listNode = props.data.map(item => < ItemChat key={item.id} id={item.id} name={item.name} chats={item.chats} removeChats={() => { props.removeChats(item.id) }}  />)
    return (
        <div >
            <h1 className="card text-center" >React Chat</h1>
            <div >
                {listNode}
            </div>
        </div>
    )
}
