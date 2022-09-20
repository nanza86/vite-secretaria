import React, { useState, useEffect } from "react";
import { Card, CardProps } from "../../components/Card";
import "./styles.css";

type ProfileResponse = {
  name: string;
  avatar_url: string;
};
type User = {
  name: string;
  avatar: string;
}
type Student = {
  studentName: string;
}

export default function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents(prevState => [newStudent, ...prevState]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/nanza86");
      const data = (await response.json()) as ProfileResponse;
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });

    }
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Avatar" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome"
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {students.map(student => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
