import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


Modal.setAppElement('#root')

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      modalIsOpen: false,
      updated: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }
 
  closeModal() {
    
    if (this.state.name || this.state.phone) {
      this.props.updateFunc()
      this.setState({updated: true, modalIsOpen: false});
    } else {
      this.setState({modalIsOpen: false});
    }
  }

  render(){
    let style = {border: '1px solid black', margin:'0 auto', borderRadius: '20px', paddingBottom: '10px', paddingTop: '10px', display: 'block', width: "50%"}
    
   
    if (this.state.name || this.state.phone) {
      style.backgroundColor = 'blue';
      
    }

    return (
      
      <div style={style}>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Edit</h2>
          <button onClick={this.closeModal}>Save and close</button>
          
          <form style={{margin:"20px"}}>
            <h2 className="App-title">{this.props.slot}</h2>
            <label>Name: </label>
            <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
            <br/><br />
            <label>Phone number: </label>
            <input type="text" value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
          </form>

        </Modal>

        {
          this.state.name || this.state.phone ? 
          <div onClick={this.openModal}>
            <form style={{margin:"20px"}}>
              <h2 className="App-title">{this.props.slot}</h2>
              <label>Name: </label>
              {this.state.name}
              <br/><br/>
              <label>Phone number: </label>
              {this.state.phone}
            </form>
          </div>
          : 
          <div onClick={this.openModal}>
            <h2 className="App-title">{this.props.slot}</h2>
            Unscheduled
          </div>
        }

    </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      num: 0
    }
  }

  updateNum() {
    let number = this.state.num;
    number++;
    this.setState({num: number});
  }


  render() {
    let times = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'];
    

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Scheduler</h1>
          <div>Calls scheduled: {this.state.num}</div>
        </header>
        
        {times.map(str => <TimeSlot slot={str} updateFunc={()=>this.updateNum()}/>)}
        
      </div>
    );
  }
}

export default App;
