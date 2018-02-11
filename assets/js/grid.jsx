import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';


export default function game_demo(root, channel) {
	ReactDOM.render(<Grid  channel = {channel} />, root);
}

//class Game extends React.Component {
//	constructor(props){
//		super(props);
//	}
//	render(){
//		 return(
//			<div>
//				<Grid />
//				<p>I have started writting the react code..</p>
//			</div>);
//	}
//}



class Tile extends React.Component {

      render(){
		return(<button style= {{width : '50px', height : '50px'}} onClick = {() => this.props.onClick()}>{this.props.val}</button>);
      }
}

class RestartButton extends React.Component {

      render(){
		return(<button style= {{width : '150px', height : '30px'}} onClick = {() => this.props.onClick()}>Restart Game </button>);
      }
}


class Grid extends React.Component {

      constructor(props){
	super(props);
	this.channel = props.channel;
	this.channel.join()
	  		 .receive("ok", this.viewReceived.bind(this) )
	       .receive("error", resp => { console.log("Unable to join", resp) });
	this.state = {
		   disp_values : Array(16).fill(null),
		   asso_values : [],
		   act_values  : [],
		   clicks : 0,
		   firstguess : -1,
		   secondguess : -1
	};
      }

			viewReceived(msg){
				console.log('channel joined:'+ gameName)
				console.log('view received', msg.view);
				this.setState(msg.view)
			}

      handleClick(index){
					this.channel.push("handlechoice", { index: index })
					            .receive("ok", this.viewReceived.bind(this));
      }


      makeTile(index) {
      		 return <Tile val = {this.state.disp_values[index]}
		 	      onClick = {() => this.handleClick(index)}/>
      }

      makeRButton(){
					 return <RestartButton onClick = {() => this.restart()} />
      }

			restart(){
				this.channel.push("restart")
										.receive("ok", this.viewReceived.bind(this));

      }

      declareWinner(unit){
				console.log("unit", unit);
				if (unit.unit === true) {
					alert('You Won ! Click ok to restart the game!');
					this.restart();
				}
				else return (<p></p>);
			}

      isWinner(){// Use the and map for checking this

				this.channel.push("checkWinner")
										.receive("ok", this.declareWinner.bind(this));

      }


		// console.log('In isWinner');
		// var count = 0;
		// var disp_values = this.state.disp_values.slice();
		// console.log(disp_values);
		// for(var i =0; i < disp_values.length; i++){
		// 	if (disp_values[i] == "DONE"){
		// 	   count++;
		// 	}
		// }
		// console.log(count)
		// console.log(disp_values.length)
		// if (count === disp_values.length){
		//    alert('You Won ! Click ok to restart the game!');
		//    this.restart();
		//    }
		// else{
		// 	return (<p></p>);
		// }



      render(){
					return (
					      	<div>
					        <div className ="container">
								<div className = "row">
									<div className = "col-sm-3">{this.makeTile(0) }</div>
									<div className = "col-sm-3">{this.makeTile(1) }</div>
									<div className = "col-sm-3">{this.makeTile(2) }</div>
									<div className = "col-sm-3">{this.makeTile(3) }</div>
								</div>
								<div className = "row">
									<div className = "col-sm-3">{this.makeTile(4) }</div>
									<div className = "col-sm-3">{this.makeTile(5) }</div>
									<div className = "col-sm-3">{this.makeTile(6) }</div>
									<div className = "col-sm-3">{this.makeTile(7) }</div>
								</div>
								<div className = "row">
									<div className = "col-sm-3">{this.makeTile(8) }</div>
									<div className = "col-sm-3">{this.makeTile(9) }</div>
									<div className = "col-sm-3">{this.makeTile(10) }</div>
									<div className = "col-sm-3">{this.makeTile(11) }</div>
								</div>
								<div className = "row">
									<div className = "col-sm-3">{this.makeTile(12) }</div>
									<div className = "col-sm-3">{this.makeTile(13) }</div>
									<div className = "col-sm-3">{this.makeTile(14) }</div>
									<div className = "col-sm-3">{this.makeTile(15) }</div>
								</div>
						</div>
						<div>
							<p>Number of clicks used : {this.state.clicks}</p>
							<p>Score : {200 - this.state.clicks}</p>
						</div>
						<div>
							{this.isWinner()}
						</div>
						<div>
							{this.makeRButton()}
						</div>
						</div>
					       );

      }
}
