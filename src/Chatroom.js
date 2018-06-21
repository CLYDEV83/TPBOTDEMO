import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import tpLogo from './1200px-Travis_Perkins.png';

import Message from './Message.js';


class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [{
                username: "Alan Cooper",
                content: <p></p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            },
            {
                username: "Travis Chat",
                content: <p></p>,
                img: tpLogo,
            }]
        };

        this.submitMessage = this.submitMessage.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

   
      

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    setMessage(response){

        this.setState({
            chats: this.state.chats.concat([{
                username: "Travis Chat",
                content: <p>{response.data.answers[0].answer}</p>,
                img: tpLogo,
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    handleMessage(question){
        let config = {
            headers: {
             'Content-Type': 'application/json',
             'Authorization': ' EndpointKey cded8aea-3b4e-42cf-b733-0d2159441400'
            }
          }

        let data = {"question": question}

       let Url = 'https://travisperkinsqnademo.azurewebsites.net/qnamaker/knowledgebases/c6214eef-a393-43f4-83ae-6ecfa78398ff/generateAnswer'

       var self = this;
        axios.post (Url, data, config).then(function(response){

          self.setMessage(response);
              
        });
    }

    submitMessage(e) {
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                username: "Alan Cooper",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });

        this.handleMessage(ReactDOM.findDOMNode(this.refs.msg).value)
    }

    render() {
        const username = "Alan Cooper";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Travis Perkins</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chatroom;