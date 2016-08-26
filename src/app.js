//SCSS file
import '../scss/main.scss';

'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import ajax from 'superagent';
import Term from './terminal/terminal.js'
import GitTree from './gitTree';
import { ipcRenderer } from 'electron';

const { Router, Route, Link, hashHistory, IndexRoute } = require('react-router');


//
// // Socket handling for app. Must be global to current page for ipcRenderer + React
// let socket = io('http://navigitorsite.herokuapp.com/');
// let socketRoom = null;
//
// /* listens for an git commit event from main.js webContent.send
//  then sends commit string to the server via socket */
// ipcRenderer.on('commitMade', function(event, arg){
// 	if(socketRoom) socket.emit('broadcastCommit', JSON.stringify(arg, null, 4));
// });
//
// /* listens for an git branch checkout event from main.js webContent.send
//  then sends commit string to the server via socket */
// ipcRenderer.on('changedBranches', function(event, arg){
// 	if(socketRoom) socket.emit('broadcastBranch', {'room': socketRoom, 'data': JSON.stringify(arg, null, 4)});
// });
//
// function dirChoice() {
// 	ipcRenderer.send('dirChoice');
// }


class App extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		message: []
	// 	}
	// 	this._handleData = this._handleData.bind(this);
	// }
	//
	// // componentWillMount() {
  // //   this.socket = io('http://localhost:3000');
	// // }
	//
	// componentDidMount() {
	// 	socket.on('test', this._handleData);
	// 	socket.on('incomingCommit', this._handleData);
  // }
	//
	// _handleData(dataObj) {
	// 	let data = JSON.parse(dataObj);
	// 	console.log("handledata", data);
	// 	this.setState({ message: this.state.message.concat(data) });
	// }
	//
	// _handleSubmit(e) {
	// 	e.preventDefault();
	//
	// 	let orgName = document.getElementById('login-org').value;
	// 	let repoName = document.getElementById('login-repo').value;
	//
	// 	ajax.get(`https://api.github.com/repos/${orgName}/${repoName}/commits`)
	// 		.end((error, response) => {
	// 			if (!error && response) {
	// 				let apiData = response.body.map(function(item){
	// 					return {
	// 						name: item.commit.author.name,
	// 						date: item.commit.author.date,
	// 						message: item.commit.message
	// 					}
	// 				}).reverse();
	// 				this.setState({ message: apiData });
	// 				console.log(apiData);
	// 			} else {
	// 				console.log('error fetching Github data', error);
	// 			}
	// 			if(socketRoom) socket.emit("unsubscribe", { room: socketRoom });
	// 			socket.emit("subscribe", { room: `${orgName}/${repoName}live` });
	// 			socketRoom = `${orgName}/${repoName}live`;
	// 		}
	// 	);
	//
	// 	// Save for now to transfer to main process later
	// 	// let githubLogin = {
	// 	// 	orgName: orgName,
	// 	// 	repoName: repoName
	// 	// }
	//
	// 	// ipcRenderer.send('githubLogin', githubLogin);
	// }

	render() {
    return (
			<div className="container_wholePage">
				<h1>naviGITor</h1>
				<div>
					<Link to="/PageOne">Click here to go page one</Link>
					{this.props.children}
				</div>
					{/* <form onSubmit={this._handleSubmit.bind(this)} className="login">
						<input id="login-org" placeholder="Github Organization" type="text" />
						<input id="login-repo" placeholder="Repo Name" type="text" />
						<button className="login-submit" type="submit">Submit</button>
					</form>
					<button onClick = {dirChoice}> Select Project Folder </button>
      		<div className="container_visualizationAndTerminal">
						<GitTree message={ this.state.message } />
						<Term />
      		</div> */}
			</div>
    );
	}
}
export default App;
// ReactDOM.render(<App />, document.getElementById('app'));

class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}
// export default Home;

class PageOne extends React.Component {
   render() {
      return (
         <div>
            <h1>Page One...</h1>
         </div>
      )
   }
}
// export default PageOne;

class PageTwo extends React.Component {
   render() {
      return (
         <div>
            <h1>Page Two...</h1>
         </div>
      )
   }
}
// export default PageTwo;




ReactDOM.render((
   <Router history = {hashHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "Home" component = {Home} />
         <Route path = "PageOne" component = {PageOne} />
         <Route path = "PageTwo" component = {PageTwo} />
      </Route>
  </Router>
), document.getElementById('app'))
