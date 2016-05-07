const { Component, render } = React;

/* ----- instructions!
*  - Make a counter that increments every 500ms
*  - Display the count using FizzBuzzCounter component (already included)
*  - Must be able to start and stop the counter using the button
*  - The counter should start as soon as it's mounted

   - Hint: 
   For the counter that increments, use this: 
          this.interval = setInterval(() => {
            //...
          }, 500);
    
    To stop it, use this: 
    
          clearInterval(this.interval);

   Bonus:
   - Make a button that can add a new FizzBuzzer when you click on it. 
   - Make a button that start/stops ALL FizzBuzzer when you click on it. (hint: use ref)

*/

class FizzBuzzCounter extends Component {
  render() {
    if (this.props.value % 3 === 0 && this.props.value % 5 === 0) {
      return <span style={{color: 'green'}}>FizzBuzz</span>
    } else if (this.props.value % 3 === 0) {
      return <span style={{color: 'yellow'}}>Fizz</span>
    } else if (this.props.value % 5 === 0) {
      return <span style={{color: 'blue'}}>Buzz</span>
    } else {
      return <span>{this.props.value}</span>
    }
  }
}

// this indicates what kind of props the components requires
FizzBuzzCounter.propTypes = { value: React.PropTypes.number };

class FizzBuzzer extends Component {
  constructor() {
    this.state = {
      enabled: false,
      value: 1,
    }
  }
  
  componentWillMount() {
    this.start();
  }
  
  toggle() {
    if (this.state.enabled) {
      this.stop();
    } else {
      this.start();
    }
  }
  
  start() {
    if (this.state.enabled) {
      return ;
    }
  
    this.setState({
      enabled: true
    });
    
    this.interval = setInterval(() => {
      this.setState({
        value: this.state.value + 1
      })
    }, 500);
  }
  
  stop() {
    this.setState({
      enabled: false
    });
    
    clearInterval(this.interval);
  }

  render() {
  
    const label = this.state.enabled ? 'Stop the timer!' : 'Start the timer!';
  
    return <div className="fizzbuzzer">
      <button onClick={this.toggle.bind(this)}>{label}</button>
      <FizzBuzzCounter value={this.state.value} />
    </div>
  }
}

class App extends Component {  

  constructor() {
    this.state = {
      buzzers: 1,
    }
  }
  
  handleAdd() {
    this.setState({
      buzzers: this.state.buzzers + 1
    })
  }
  
  handleStop() {
    for (let i = 0; i < this.state.buzzers; i++) {
      this.refs[`buzz-${i}`].stop();
    }
  }
  
  handleStart() {
    for (let i = 0; i < this.state.buzzers; i++) {
      this.refs[`buzz-${i}`].start();
    }
  }

  render() {
    
    const buzzers = [];
    for (let i = 0; i < this.state.buzzers; i++) {
      buzzers.push(<FizzBuzzer key={i} ref={`buzz-${i}`} />)
    }
            
    return <div>
      <button onClick={this.handleAdd.bind(this)}>Add a buzzer</button>
      <button onClick={this.handleStop.bind(this)}>Stop all buzzers</button>
      <button onClick={this.handleStart.bind(this)}>Start all buzzers</button>
      {buzzers}
    </div>
    
    
  }
}

const container = document.getElementById('container');
render( <App /> , container);
