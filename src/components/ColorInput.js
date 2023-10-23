const Color = ({ color, currentColor, handleColor }) => {
  const colorClass = () => {
    if (color === currentColor) {
      return "expenseColor activeExpenseColor";
    } else {
      return "expenseColor";
    }
  };

  const handleColorClick = () => {
    handleColor(color);
  };

  return (
    <div
      className={colorClass()}
      onClick={handleColorClick}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default Color;
