import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import { FormControl, Input, IconButton } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendSharpIcon from "@material-ui/icons/SendSharp";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  //runs once the app component loads to get past database messages
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  //runs on condition of start up
  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    //all the logic to send the message
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <div className="app">
      <img
        src="https://scontent-ort2-1.xx.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=rGk9fluk1_cAX-ioMP9&_nc_ht=scontent-ort2-1.xx&oh=27746f17f6cfe1f7f097b9bdc20abd4a&oe=5FE70BFD"
        alt="messenger__logo"
        className="header__logo"
      />
      <h1>Facebook Messenger Clone App</h1>
      <h2> Welcome {username}!</h2>
      <form className="app__form">
        <FormControl className='app__formControl'>

          {/* <InputLabel>Enter Your Message Here</InputLabel> */}
          <Input
            className="app__input"
            placeholder='Enter Your Message Here'
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
            
          <IconButton
            disabled={!input}
            type="submit"
            onClick={sendMessage}
            // variant="contained"
            color="primary"
            className="app__iconButton"
          >
            <SendSharpIcon /> 
          </IconButton>

        </FormControl>
      </form>

      {/* messages themselves */}
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
