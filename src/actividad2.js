import React from 'react';
import './App.css';

export default class Ask extends React.Component{
    constructor() {
        super()
        const data = require("./data/data.json")
        this.state = {
            data: data.data,
            question: '',
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

    _runData() {
        let elemento = this.state.data[this.state.position][this.state.element]
        this._asking(elemento)
    }

    _asking(elemento) {
        this.setState({question: "Tu objeto tiene el elemento " + elemento + "?"})
    }

    async _chaining(check) {
        let checkedElement = this.state.data[this.state.position][this.state.element]
        let newData = [], finish = false, found = this.state.found
        if (check) { await this.setState({found: found += " " + checkedElement}) }

        for (let i = 0; i < this.state.data.length; i++) {
            const object = this.state.data[i]

            if (check) {
                const result = object.filter(element => element === checkedElement)

                if (object.length === 1 && result.length === 1) {
                    this.setState({question: "Objeto encontrado '[" + this.state.found + " ]'", checked: true})
                    finish = true
                } else {
                    let newObject = object.filter(element => element !== checkedElement)
                    if (result.length > 0) { newData.push(newObject) }
                }

            } else {

                if (this.state.data.length === 1) {
                    this.setState({question: "Objeto no encontrado", checked: true})
                    finish = true
                } else {
                    const result = object.filter(element => element !== checkedElement)
                    if (result.length === object.length) { newData.push(result) }
                }

            }
        }

        if (!finish) { this.setState({data: newData, question: "Tu objeto tiene el elemento " + newData[0][0] + "?"}) }
    }

    render() {
        return (
            <div>
                <p>{this.state.question}</p>
                <div className="container">
                    { !this.state.checked &&
                        <div className="row">
                            <button onClick={() => this._chaining(true)} type="button" className="btn btn-primary col">Si</button>
                            <button onClick={() => this._chaining(false)} type="button" className="btn btn-secondary col">No</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
