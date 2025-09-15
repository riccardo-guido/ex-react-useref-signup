import { useMemo, useState } from 'react'

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";


function App() {

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [description, setDescription] = useState("");

  const isUsernameValid = useMemo(() => {
    const charsValid = username.split("").every(char => letters.includes(char.toLocaleLowerCase()) || numbers.includes(char));

    return charsValid && username.trim().length >= 6;
    
  }, [username]);

  const isPasswordvalid = useMemo(() => {
    return (
      password.trim().length >= 6 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return description.trim().length >= 100 && description.trim().length < 1000;
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !experienceYears.trim() ||
      experienceYears < 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordvalid || 
      !isDescriptionValid
    ){
      alert("Errore: Compila tutti i campi");
      return;
  }
  console.log("Form inviato con successo", {
    fullName,
    username,
    password,
    specialization,
    experienceYears,
    description
  });
  }


  return (
    <>
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nome Completo</p>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          <p>Username</p>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {username.trim() && (
            <p style={{ color: isUsernameValid ? "green" : "red" }}>
              {isUsernameValid ? "Username valido" : "Username non valido"}
            </p>
          )}
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
           {password.trim() && (
            <p style={{ color: isPasswordvalid ? "green" : "red" }}>
              {isPasswordvalid ? "Password valida" : "Password non valida"}
            </p>
          )}
        </label>
        <label>
          <p>Specializzazione</p>
         <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
           <option value="">Seleziona...</option>
           <option value="frontend">Frontend</option>
           <option value="backend">Backend</option>
           <option value="fullstack">Fullstack</option>
         </select>
        </label>
        <label>Anni di esperienza</label>
        <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
        <label>
          <p>Descrizione</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {description.trim() && (
            <p style={{ color: isDescriptionValid ? "green" : "red" }}>
              {isDescriptionValid ? "Descrizione valida" : "Descrizione non valida"}
            </p>
          )}
        </label>
        <button type='submit'>Registrati</button>
      </form>
    </div>
    </>
  )
}

export default App
