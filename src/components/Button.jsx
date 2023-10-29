function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`px-2 py-2 rounded-md flex items-center justify-center ${bgColor} ${textColor} ${className} `}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
