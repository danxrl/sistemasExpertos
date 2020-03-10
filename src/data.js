import React from 'react';
import './App.css';
import Actividad1 from './actividad1'
import Actividad2 from './actividad2'

export default class Data extends React.Component{
    constructor() {
        super()
        this.state = {
            actividad: 2
        }
    }

    _runData() {
        const data = require("./data/data.json")
        return data.data.map((element, key) => {
            return(
                <tr key={key}>
                    <td className="">{key + 1}</td>
                    <td className="">{element[0]}</td>
                    <td className="">{element[1]}</td>
                    <td className="">{element[2]}</td>
                </tr>
            )
        })
    }

    _actividadRender() {
        switch (this.state.actividad) {
            case 1:
                return <Actividad1 />

            case 2:
                return <Actividad2 />
            default:
                break;
        }
    }

    render() {
        return (
            <div className="Data">
                <h3>Actividad {this.state.actividad}</h3>
                <table className="table table-dark container">
                    <thead>
                        <tr>
                            <th>Objeto</th>
                            <th>Elemento 1</th>
                            <th>Elemento 2</th>
                            <th>Elemento 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._runData()}
                    </tbody>
                </table>
                {this._actividadRender()}
            </div>
        )
    }
}
