import React, { Component } from 'react';
import ListChat from './ListChat';
import FormChat from './FormChat';


import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


export default class BoxChat extends Component {
    constructor(props){
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
                    const data = response.data.map( item => {
                        item.sent = true;
                        return item
                    })
                    this.setState({ data: data })
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                })
    
        }

        addChats(name, chats) {
            const id = Date.now();
            this.setState(function (state, props) {
                return {
                    data: [...state.data, { id, name, chats}]
                };
            });
            request.post('chat', { id, name, chats})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    this.setState(function (state, props) {
                        return {
                            data: state.data.map(item => {
                               if(item.id === id){
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
                return {
                    data: state.data.filter(item => item.id !== id)
                };
            });
            request.delete(`chats/${id}`)
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
                <ListChat />
                <FormChat add={this.addChats} data={this.state.data} remove={this.removeChats}/>
            </div>
        )
    }
}
