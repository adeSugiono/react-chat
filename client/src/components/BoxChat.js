import React, { Component } from 'react';
import ListChat from './ListChat';
import FormChat from './FormChat';
import ItemChat from './ItemChat';
import axios from 'axios';
import { io } from 'socket.io-client';


const socket = io('http:localhost:5000');
const request = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


export default class BoxChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.addChats = this.addChats.bind(this)
        this.removeChats = this.removeChats.bind(this)
    }

    //lifesycle
    componentDidMount() {
        request.get('chat')
            .then(function (response) {
                const data = response.data.map(item => {
                    item.sent = true;
                    return item
                })
                this.setState({ data: data })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        socket.on('chat', function (data) {
            console.log(data)
            this.setState((state, props) => (
                {
                    data: [...state.data, { ...data, sent: true }]
                }))
            }.bind(this));
        socket.on('delete-message', function (id) {
            console.log(id)
            this.setState((state, props) => ({
                data: state.data.filter(item => {
                    return item.id !== id.id
                })
            }))
        }.bind(this))

    }

    addChats(name, chats) {
        const id = Date.now();
        this.setState(function (state, props) {
            return {
                data: [...state.data, { id, name, chats }]
            };
        });

        socket.emit('receive-message', { id, name, chats })

        request.post('chat', { id, name, chats })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                this.setState(function (state, props) {
                    return {
                        data: state.data.map(item => {
                            if (item.id === id) {
                                item.sent = false;
                            }
                            return item;
                        })
                    };
                });
            }.bind(this))
    }

    removeChats(id) {
        this.setState(function (state, props) {
            console.log(state)
            return {
                data: state.data.filter(item => item.id !== id)
            };
        });

        socket.emit('delete-message', { id })
        //delete beckend chat

        request.delete(`chat/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="container">
                <ListChat data={this.state.data} removeChats={this.removeChats} />
                <ItemChat removeChats={this.removeChats} />
                <FormChat add={this.addChats} />
            </div>
        )
    }
}
