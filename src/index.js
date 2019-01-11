import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function AddUser(props) {
  return (
    <button className="button" onClick={props.onClick}>
      Agregar
    </button>
  );
}

function isEmptyText(){
    const nombre = document.getElementById("Nombre").value;
    const apellido = document.getElementById("Apellido").value;
    const origen = document.getElementById("Origen").value;
    const destino = document.getElementById("Destino").value;
    return (nombre === "" || apellido === "" || origen === "" || destino === "");
}

class AddTable extends React.Component {

  renderAddUser() {
    return (
      <AddUser
        value={"agregar"}
        onClick={() => this.props.onClick()}
      />
    );
  }

  render() {
    return (
      <div>
	<div>
	  <div className="info">
	    Nombre
	  </div>
	  <div>
	    <input id="Nombre"/>
	  </div>
	</div>
	<div>
	  <div className="info">
	    Apellido
	  </div>
	  <div>
	    <input id="Apellido"/>
	  </div>
	</div>
	<div>
	  <div className="info">
	    Origen
	  </div>
	  <div>
	    <input id="Origen"/>
	  </div>
	</div>
	<div>
	  <div className="info">
	    Destino
	  </div>
	  <div>
	    <input id="Destino"/>
	  </div>
	</div>
	<div>
          <div>
            {this.renderAddUser()}
	  </div>
        </div>
      </div>
    );
  }
}

class AeroLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          pasajero: {
		  nombre: 0,
		  apellido: 0,
		  origen: 0,
		  destino: 0
		}
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    if(isEmptyText()){
      return;
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const pasajero = 
        {
          nombre: document.getElementById("Nombre").value,
          apellido: document.getElementById("Apellido").value,
          origen: document.getElementById("Origen").value,
          destino: document.getElementById("Destino").value
        };

    //pasajero[i] = {};
    this.setState({
      history: history.concat([
        {
          pasajero: pasajero
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  EditUser(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  DeleteUser(state) {
    const history = this.state.history.splice(state,1);
    this.setState({
       history: history
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      if(move == 0){
        return;
      }else{
        return (
        <li key={move}>
	  <div>
	    <b>Nombre: {history[move].pasajero.nombre} - </b>
	    <b>Apellido: {history[move].pasajero.apellido} - </b>
	    <b>Origen: {history[move].pasajero.origen} - </b>
	    <b>Destino: {history[move].pasajero.destino} - </b>
	    <button onClick={() => this.EditUser(move)}>Editar</button>
	    <button onClick={() => this.DeleteUser(move)}>Eliminar</button>
	  </div>
        </li>
        );
      }
    });

    let status;
    status = "Cantidad de pasajeros: " + (this.state.history.length-1);

    return (
      <div className="aeroline">
        <div className="aeroline-add">
          <AddTable
            //pasajero={current.pasajero}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="aeroline-list">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<AeroLine />, document.getElementById("root"));

