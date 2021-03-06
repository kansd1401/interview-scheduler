import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";import Application from "components/Application";
import Form from "components/Appointment/form";


afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  
  

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(   <Form interviewers={interviewers} />)

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const save = jest.fn()
    const onSave = jest.fn();
        /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} save={save} onSave ={onSave} name="" />
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save")); 

    expect(getByText(/Please enter your name and select a interviewer/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const save = jest.fn()
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText, debug } = render(
      <Form interviewers={interviewers} save ={save} onSave ={onSave} name="Lydia Miller-Jones" interviewer={1}/>
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save")); 
    expect(queryByText(/Please enter your name and select a interviewer/i)).toBeNull();
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("submits the name entered by the user", () => {
    const save = jest.fn()
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} save={save} onSave={onSave} interviewer={1}/>
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const save = jest.fn()
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} save={save} onSave={onSave} interviewer={1}/>
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/Please enter your name and select a interviewer/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/Please enter your name and select a interviewer/i)).toBeNull();
  
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones",1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        save={jest.fn()}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(0);

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
    fireEvent.click(getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  }); 
});