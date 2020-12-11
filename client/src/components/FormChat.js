import React, { Component } from 'react'

export default class FormChat extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', chats: '' };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeChats = this.handleChangeChats.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeChats(event) {
        this.setState({ chats: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.add(this.state.name, this.state.chats);
        this.setState({ name: '', chats: '' });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row mt-20">
                    <label className="col-sm-1 col-form-label"></label>
                    <div className="col-sm-11">
                        <input type="text" placeholder="your name" className="form-control" value={this.state.name} onChange={this.handleChangeName} /><br></br>
                        <textarea type="text" placeholder="write your chat here..." className="form-control" rows="4" value={this.state.chats} onChange={this.handleChangeChats} /><br></br>
                        <input className="btn btn-primary" type="submit" value="Post" />
                    </div>
                </div>
            </form>
        )
    }
}
