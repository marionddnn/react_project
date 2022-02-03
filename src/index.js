import React from 'react';
import {render} from 'react-dom';

const styles1 = {
  textAlign : "center",
  color : "#de9020",
}

const styles2 = {
  color : "#2975a7",
  textAlign : "center"
}

const alert = {
  border : "4px solid #a72929",
  padding : "3rem",
  textAlign : "center",
  color : "red",
}

window.timer = {
  interval : 0,
  time : null,
}


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:150, 
      sequence: "travail", 
      styles : styles1,  
      options : false,
      launch : false, 
      inputWork : 150, 
      inputPause :100,
      display : "",
    };
  }
  
  switchSequence = (sequence) => {
    switch(sequence) {
      case "pause" : 
        return {count : this.state.inputWork, sequence: "travail", styles : styles1};
      case "travail" : 
        return {count : this.state.inputPause, sequence: "pause", styles : styles2};
      default : 
      return null;
    }
  }

  setOptions = () => {
    this.setState({options : true});
    this.setState({launch : false}); 
  }

  validateOptions = () => {
    this.setState({options : false});
    this.resetT();
  }

  setTimeWork = (e) => {
    this.setState({inputWork : e.target.value});
  }

  setTimePause = (e) => {
    this.setState({inputPause : e.target.value});
  }

  decrement = () => {
    this.setState({count : --this.state.count}, ()=> {
      this.createTimer(this.state.count);
      if(this.state.count <= 0) {
        clearInterval(window.timer.time);
        this.launch();
      }
      else if(this.state.count <= 20){
        this.setState({styles : alert});
      }
    });
  }

  createTimer(time) {
    var minutes = Math.floor(time / 60);
    var seconds = (time - minutes * 60);
    var stringTimer = minutes + " : " + seconds;
    this.setState({display : stringTimer});
  }

  launch = () => {
    this.setState(
      this.switchSequence(this.state.sequence), () => {
        this.timer();
    });
    this.setState({launch : true}); 
  }

  resetT = () => {
    this.stop();
    this.launch();
  }

  stop = () => {
    clearInterval(window.timer.time);
  }

  relaunch = () => {
    this.timer();
  }
  
  timer = () => {
      window.timer.time = setInterval(
        this.decrement, 1000
      )
  }

  render(){
    if(this.state.options === false && this.state.launch === false){
      return (
        <div style={this.state.styles}>
          <h1> {this.state.sequence} </h1>
          <h2> {this.state.display} </h2>
          <button onClick={this.launch}> Commencer </button>
          <button onClick={this.setOptions}> Choisir les options </button>
        </div>
      )
    }
    else if (this.state.options === false && this.state.launch === true){
      return (
        <div style={this.state.styles}>
          <h1> {this.state.sequence} </h1>
          <h2> {this.state.display} </h2>
          <button onClick={this.stop}> Arrêter </button>
          <button onClick={this.relaunch}> Relancer </button>
          <button onClick={this.setOptions}> Choisir les options </button>
        </div>
      )
    }
    else {
      return (
        <div style={this.state.styles}>
          <h1> {this.state.sequence} </h1>
          <h2> {this.state.display} </h2>
          <div>
            <label htmlFor="work"> work : </label>
            <input id="work" value={this.state.inputWork} onChange={this.setTimeWork} placeholder="temps de travail"/>
            <label htmlFor="pause"> pause : </label>
            <input id="pause" value={this.state.inputPause} onChange={this.setTimePause} placeholder="temps de pause"/>
            <button onClick={this.validateOptions}>Valider</button>
            </div>  
        </div>
      )
    }
  }
}

const rootElt = document.getElementById('root');

setInterval(
  () => render(<Demo/>, rootElt), 1000
);
