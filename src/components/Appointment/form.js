import React,{useState} from "react";
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const saved = () =>{
    if( name.length){
      props.save(name,interviewer)
      props.onSave()
      setError("")
      return
    }
    setError("Student name cannot be blank")
  }

  const cancel = () =>{
    if(!name.length){
      props.onCancel()
      return
    }
    setName("")
    setInterviewer(null)
  }

  return (
    <main className="appointment__card appointment__card--create" >
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input 
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm data-testid="save" onClick={saved}>Save</Button>
        </section>
      </section>
    </main>
  );
}