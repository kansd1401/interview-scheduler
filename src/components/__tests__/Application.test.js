import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByText ,getByAltText ,getByPlaceholderText, queryByText} from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";


beforeEach(() => {
  cleanup()
});

describe("Form", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

    fireEvent.click(getByText("Monday"));

    expect(getByText("Archie Cohen")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment",async () => {
    const { container} = render(<Application />);
    
    await waitForElement(() => getByText(container,"Archie Cohen")) 
    
    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    axios.put.mockRejectedValueOnce();
    
    fireEvent.click(getByText(appointment, "Save"));
    
    await waitForElement(() => queryByText(appointment, "Error"));

    expect(queryByText(appointment, "Error")).toBeInTheDocument("Could not save the appointment.");
  });

  it("shows the delete error when failing to delete an appointment",async () => {
    const { container, debug} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen")) 
    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Delete"));
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1",
  async() => {
    const { container, debug} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen")) 

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    expect(queryByText(appointment, "Saving")).not.toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen")) 
    const appointment = getAllByTestId(container, "appointment")[1];

    fireEvent.click(getByAltText(appointment, "Delete"));
    
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElement(() => getByAltText(appointment, "Add"));

    const boi = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(boi, "1 spot remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug} = render(<Application />);

    await waitForElement(() => getByText(container,"Archie Cohen")) 
    fireEvent.click(getByText(container,"Tuesday"));

    expect(getByText(container,"Leopold Silvers")).toBeInTheDocument();
    
    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Edit"));
    
    await waitForElement(() => getByText(appointment,"Save")) 
  });

  
})