import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';


export default function game_demo(root) {
	ReactDOM.render(<Grid />, root);
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
	this.state = {
		   disp_values : Array(16).fill(null),
		   asso_values : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
		   act_values  : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
		   clicks : 0,
		   firstguess : -1,
		   secondguess : -1
	};
      } 

      handleClick(index){
	
		if (this.state.firstguess === -1){
		   this.state.firstguess = index;
		   var disp_values = this.state.disp_values.slice();
		   disp_values[index] = this.state.asso_values[index];
		   this.setState({disp_values : disp_values, clicks : this.state.clicks + 1});
		   console.log(this.state.clicks);
		   
		}

		else{
		  var tid;
		  if ((this.state.secondguess === -1) && (index !== this.state.firstguess)){
		     this.state.secondguess = index;
		     var disp_values = this.state.disp_values.slice();
		     disp_values[index] = this.state.asso_values[index];
		     this.setState({disp_values : disp_values, clicks : this.state.clicks + 1});
		     console.log(this.state.clicks);
		     if (this.state.asso_values[this.state.firstguess] === this.state.asso_values[this.state.secondguess]) {
		     	  console.log('Ok till here..');
		       	  var disp_values = this.state.disp_values.slice();
		       	  disp_values[this.state.firstguess] = 'DONE';
		       	  disp_values[this.state.secondguess] = 'DONE';
		       	  var asso_values = this.state.asso_values.slice();
		       	  asso_values[this.state.firstguess] = 'DONE';
		       	  asso_values[this.state.secondguess] = 'DONE';
		       	  this.state.firstguess = -1;
		       	  this.state.secondguess = -1;
		       	  this.setState({disp_values : disp_values , asso_values : asso_values, firstguess : this.state.firstguess, secondguess : this.state.secondguess});
		      
		      }

		      else{
			
				tid = setTimeout(( ) => {
					      	  disp_values[this.state.firstguess] = null;
						  disp_values[this.state.secondguess] = null;
						  this.state.firstguess = -1;
		       				  this.state.secondguess = -1;
						  this.setState({disp_values : disp_values, firstguess : this.state.firstguess, secondguess : this.state.secondguess});
						},1000);
		  				 }
		  }
		  else{
			clearTimeout(tid);
		  }


		   }
		
      }


      makeTile(index) {
      		 return <Tile val = {this.state.disp_values[index]}
		 	      onClick = {() => this.handleClick(index)}/>
      }

      makeRButton(){
		return <RestartButton onClick = {() => this.restart()} />
      }

// The following code shuffle function is adopted from the code on (https://codepen.io/PiotrBerebecki/pen/qaRdgX)

      shuffle(array){
	var i = array.length, j = 0, temp;
	while(i--){
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
      }
////////////////////////////////////////////////////////////////////////////////////////////////////
      restart(){
		console.log('Wanna Restart?');
		var disp_values = this.state.disp_values.slice();
		disp_values = Array(16).fill(null);
		var asso_values = this.state.asso_values.slice();
		asso_values = this.shuffle(this.state.act_values.slice());
		this.setState({disp_values : disp_values, asso_values : asso_values, clicks : 0 });
		
      }

      isWinner(){
		console.log('In isWinner');
		var count = 0;
		var disp_values = this.state.disp_values.slice();
		for(var i =0; i < disp_values.length; i++){
			if (disp_values[i] == 'DONE'){
			   console.log(disp_values[i]);
			   count++;
			}
		}
		if (count === disp_values.length){
		   alert('You Won ! Click ok to restart the game!');
		   this.restart();
		   }
		else{
			return (<p></p>);
		}
		
      }

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
