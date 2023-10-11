import { useState } from "react";

export const Comment = ({
  id,
  name,
  mutate,
  comment,
  locationName,
  handleDeleteComment,
}) => {
  const [showCommentEditInput, setShowCommentEditInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const comment = data.comment;

    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (response.ok) {
      await mutate();
      setShowCommentEditInput(!showCommentEditInput);
    }
  };
  return showCommentEditInput ? (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <textarea
        style={{ width: "100%" }}
        name="comment"
        defaultValue={comment}
      ></textarea>
      <button onClick={() => setShowCommentEditInput(false)}>Cancel</button>
      <button>Submit</button>
    </form>
  ) : (
    <div>
      <p>
        <small>
          <strong>{name}</strong> commented on {locationName}
        </small>
      </p>
      <p>{comment}</p>
      <button onClick={() => setShowCommentEditInput(true)}>Edit</button>
      <button onClick={handleDeleteComment}>Delete</button>
    </div>
  );
};
