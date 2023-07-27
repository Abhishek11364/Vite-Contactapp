import React from "react";
const Navbar = () => {
  return (
    <div className="my-4 flex h-[60px]  w-[50px] items-center justify-center gap-2 rounded-lg  text-xl font-medium" style={{ backgroundColor: 'white'}}>
      <img src="/firebase.svg" />
      <h1>Firebase Contact App</h1>
    </div>
  );
};

export default Navbar;