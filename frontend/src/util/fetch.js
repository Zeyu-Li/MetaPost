const url = "http://localhost:3005/api";

export const post = (data) => {
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: data, // body data type must match "Content-Type" header
  });
};
