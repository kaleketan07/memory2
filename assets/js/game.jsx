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

      render() {
         return (<button style = {{width : '30px', height : '20px'}} onclick = { () => this.props.onClick()}> Restart Game </button>);
	}

}


class Grid extends React.Component {

      constructor(props){
	super(props);
	this.state = {
		   disp_values : Array(16).fill(null),
		   asso_values : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
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
			
			setTimeout(( ) => {
					      	  disp_values[this.state.firstguess] = null;
						  disp_values[this.state.secondguess] = null;
						  this.state.firstguess = -1;
		       				  this.state.secondguess = -1;
						  this.setState({disp_values : disp_values, firstguess : this.state.firstguess, secondguess : this.state.secondguess});
						},1000);
		   }
		   }
		
      }

      makeRbutton() {
      		 return <RestartButton onClick = {() => this.restartGame()} />
      }


      makeTile(index) {
      		 return <Tile val = {this.state.disp_values[index]}
		 	      onClick = {() => this.handleClick(index)}/>
      }

      restartGame(){
	console.log('Wanna restart?');
      }

      render(){
		return (
		       <div>
			<table>
				<tbody>
					<tr>
						<td>{this.makeTile(0) }</td>
						<td>{this.makeTile(1) }</td>
						<td>{this.makeTile(2) }</td>
						<td>{this.makeTile(3) }</td>			
					</tr>
					<tr>
						<td>{this.makeTile(4) }</td>
						<td>{this.makeTile(5) }</td>
						<td>{this.makeTile(6) }</td>
						<td>{this.makeTile(7) }</td>			
					</tr>
					<tr>
						<td>{this.makeTile(8) }</td>
						<td>{this.makeTile(9) }</td>
						<td>{this.makeTile(10) }</td>
						<td>{this.makeTile(11) }</td>			
					</tr>
					<tr>
						<td>{this.makeTile(12) }</td>
						<td>{this.makeTile(13) }</td>
						<td>{this.makeTile(14) }</td>
						<td>{this.makeTile(15) }</td>			
					</tr>
				</tbody>
			</table>
			<div>
				{this.makeRbutton()}
			</div>
		       </div>
		       );
	
      }
}



