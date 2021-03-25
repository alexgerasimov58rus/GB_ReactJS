
import React, {Component} from 'react'
import ReactDom from 'react-dom'

let messages = [];

const Messages = () =>{
    return (
        <div>
            <h1>MESSAGES</h1>
            <ul>
            {messages.map((message, key) => (
                <li key={key}>{message}</li>
            ))}
            </ul>
            <input type="text" placeholder="Введите сообщение" id="input"/>
            <button onClick={addMessage}>Отправить</button>
        </div>
    );
};

function addMessage(){
    let obj = document.getElementById("input");

    if( obj != null){
        messages.push(obj.value);
        obj.value = "";
    }

    render();
}

function render() {
    ReactDom.render(
        <>
            <Messages title = "title" />
        </>,
        document.querySelector("#root")
    );
}

render();

// import React, {Component} from 'react'
// import ReactDom from 'react-dom'
// import style from "./index.module.css"
// import "./index.css"

// const App = () => {
//     return <div className={style.app}> Hello React </div>;
// };
//
// class App2 extends Component{
//     render() {
//         return <div className="app"> App2 class {this.props.name}</div>;
//     }
// };
//
// const Test = ({name}) => {
//     return React.createElement(
//         "ul",
//         null,
//         React.createElement("li", null, name),
//         React.createElement("li", null, "Второй")
//     );
// };
//
// ReactDom.render(
//     <>
//     <App />
//     <App2 name= " with props"/>
//     <Test name="Самый первый"/>
//     </>,
//     document.querySelector("#root"));

// import "./index.css"
// import style from "./index.module.css"
// import logo from "@assets/mouse.png"
//
// console.log(style, logo);
//
// class Test {
//     a = 12;
// }
//
// console.log("hello", new Test().a);
// console.log(null ?? "работает");
//
// const a = { b: 12, c: null};
// const b = { b: 12, c: { y: 10 }};
//
// console.log(a?.c?.y);
// console.log(b?.c?.y);
