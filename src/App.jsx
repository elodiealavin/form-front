import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      const response = await axios.post("http://localhost:3000/form", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        subject: subject,
        message: message,
      });
      handleToken(response.data.token);
    } catch (error) {
      setError(error);
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return isLoading || error ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <header>
        <div className="container">
          <h1>Formulaire de contact</h1>
        </div>
      </header>
      <section className="container">
        <form id="contactForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="firstname"
            onChange={handleFirstNameChange}
          />
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="lastname"
            onChange={handleLastNameChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="marie.a@mail.com"
            onChange={handleEmailChange}
          />
          <input
            type="text"
            name="subject"
            value={subject}
            placeholder="Sujet de votre demande"
            onChange={handleSubjectChange}
          />
          <textarea
            name="message"
            cols="30"
            rows="10"
            value={message}
            placeholder="votre message..."
            onChange={handleMessageChange}
          ></textarea>

          <button type="submit"> Envoyer la demande</button>
        </form>
      </section>
    </div>
  );
}

export default App;
