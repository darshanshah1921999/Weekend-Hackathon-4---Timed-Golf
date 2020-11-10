import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      position: { top: "0px", left: "0px" },
      clicked: false
    };
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleBall = this.handleBall.bind(this);
  }

  handleStartClick() {
    if (!this.state.clicked) {
      let copy = { ...this.state };
      copy.clicked = true;
      this.setState(copy);
      this.id = setInterval(() => {
        this.handleTime();
      }, 1000);
      document.addEventListener("keydown", this.handleBall);
    }
  }

  handleTime() {
    let copy = { ...this.state };
    copy.time = Number(copy.time) + 1;
    this.setState(copy);
  }

  handleBall(event) {
    let copy = { ...this.state };
    if (event.code === "ArrowUp") {
      copy.y = Number(copy.y) - 5;
    } else if (event.code === "ArrowRight") {
      copy.x = Number(copy.x) + 5;
    } else if (event.code === "ArrowDown") {
      copy.y = Number(copy.y) + 5;
    } else if (event.code === "ArrowLeft") {
      copy.x = Number(copy.x) - 5;
    }
    copy.position = {
      left: copy.x + "px",
      top: copy.y + "px"
    };
    this.setState(copy);
  }

  componentDidUpdate() {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.id);
      document.removeEventListener("keydown", this.handleBall);
    }
  }

  render() {
    return (
      <>
        <div className="ball" style={this.state.position}></div>
        <div className="hole"></div>
        <div className="heading-timer">{this.state.time}</div>
        <button className="start" onClick={this.handleStartClick}>
          Start
        </button>
      </>
    );
  }
}

export default Timer;
