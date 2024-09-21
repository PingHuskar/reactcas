import React from 'react'

const Button = ({onClick,children}) => {
  return <button className={`px-6 py-2 m-4 bg-blue-400 border-4 rounded-xl border-solid border-spacing-4 border-blue-600`} onClick={onClick}>{children}</button>;
};

export default Button