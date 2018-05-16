import React from 'react';
import io from 'socket.io-client'

class Chat extends React.Component{
  constructor(props){
          super(props);

          this.state = {
              username: '',
              message: '',
              messages: []
          };

          this.socket = io('localhost:3000');

          this.socket.on('terimapesan', function(data){
              addMessage(data);
          });

          const addMessage = data => {
              console.log(data);
              this.setState({messages: [...this.state.messages, data]});
              console.log(this.state.messages);
          };

          this.sendMessage = ev => {
              ev.preventDefault();
              this.socket.emit('kirimpesan', {
                  author: this.state.username,
                  message: this.state.message
              })
              this.setState({message: ''});

          }
      }
  render(){
    return (
      <div className="overpower">
        <div className="jumbotron">
          <h1>React Chat</h1>
        </div>
        <div className="container">
            <div className="row">
              <div className="timeline-centered" id="textarea">
                <div className="messages">
                  {this.state.messages.map(message => {
                    return   <article className="timeline-entry message">
                               <div className="timeline-entry-inner">
                                 <div className="timeline-icon bg-warning">
                                   <span className="glyphicon glyphicon-minus"></span>
                                 </div>
                                   <div className="timeline-label">
                                     <h2><b>{message.author}</b></h2>
                                     <p>{message.message}</p>
                                   </div>
                                 </div>
                              </article>
                    })}
                </div>
            <article className="timeline-entry" >
              <div className="timeline-entry-inner">
              <div className="timeline-icon">
                <span className="glyphicon glyphicon-plus"></span>
              </div>
                <div className="timeline-label">
                  <div className="inner-addon left-addon">
                    <input type="text" className="form-control" placeholder="Your Name" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/><br></br>
                      <textarea className="form-control" rows="3" placeholder="write your chat here.." value={this.state.message} onChange={ev=> this.setState({message: ev.target.value})}></textarea><br></br>
                      <button onClick={this.sendMessage} type="submit" className="btn btn-primary">Post</button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Chat;
