import React from 'react';
import './App.css';

export default class Ask extends React.Component{
    constructor() {
        super()
        const data = require("./data/data.json")
        this.state = {
            data: data.data,
            pregunta: '',
            answer: false,
            position: 0,
            element: 0,
            checked: false,
            found: ''
        }
    }

    componentDidMount() {
        this._runData()
    }

    async _restart() {
        const data = require("./data/data.json")
        await this.setState({
            data: data.data,
            pregunta: '',
            answer: false,
            position: 0,
            element: 0,
            checked: false,
            found: '',
            checkedElement: ''
        })
        this._runData()
    }

    _runData() {
        let elemento = this.state.data[this.state.position][this.state.element]
        this.setState({checkedElement: elemento})
        this._asking(elemento)
    }

    _asking(elemento) {
        this.setState({pregunta: "Tu objeto tiene el elemento " + elemento + "?", element: this.state.element + 1})
    }

    async _chaining(check) {
        if (check) {
            let found = this.state.found, checkedElement = this.state.checkedElement
            await this.setState({found: found += " " + checkedElement})
            if (this.state.element === 3) {
                this.setState({checked: true, pregunta: "Objeto encontrado'[" + this.state.found + " ]'"})
            } else if (this.state.element < this.state.data[this.state.position].length) {

                this._runData()
            }
        } else {
            if (this.state.position < this.state.data.length - 1) {
                await this.setState({element: 0, position: this.state.position + 1, found: ''})
                this._runData()
            } else {
                await this.setState({pregunta: 'Objeto no encontrado', element: 0, position: 0, checked: true})
            }
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.pregunta}</p>
                <div className="container">
                    { !this.state.checked &&
                        <div className="row">
                            <button onClick={() => this._chaining(true)} type="button" className="btn btn-primary col">Si</button>
                            <button onClick={() => this._chaining(false)} type="button" className="btn btn-secondary col">No</button>
                        </div>
                    }
                    { this.state.checked &&
                        <div className="row">
                            <button onClick={() => this._restart()} type="button" className="btn btn-success col">Reiniciar</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
