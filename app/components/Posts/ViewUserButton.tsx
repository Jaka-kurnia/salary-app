"use client";

const ViewUserButton = () => {
  const testClick = () => alert("Aku di klik");
  return (
    <>
      <button onClick={testClick}>Cek User</button>
    </>
  );
};

export default ViewUserButton;
