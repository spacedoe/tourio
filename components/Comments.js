import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { Fragment } from "react";

export default function Comments({ id, locationName, comments, mutate }) {
  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  async function handleSubmitComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = Object.fromEntries(formData);

    const response = await fetch(`/api/places/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (response.ok){
      mutate()
    }

    if (!response.ok) {
      const error = await response.json();
      console.log("Error:", error, response.status);
    }
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ _id, name, comment }) => {
            return (
              <Fragment key={_id}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </Fragment>
            );
          })}
        </>
      )}
    </Article>
  );
}
