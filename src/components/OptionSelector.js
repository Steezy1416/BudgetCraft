const OptionSelector = ({ children, options, handlerFunction, formData }) => {
  return (
    <div className="form-section">
      <p>{children}</p>
      {options.map((option) => (
        <label key={option} className="radio-btn">
          {option}
          <input
            type="radio"
            checked={formData.value === option.toLowerCase()}
            name={children}
            required
            value={option}
            onChange={handlerFunction}
          />
          <div className="radio-circle" />
        </label>
      ))}
    </div>
  );
};

export default OptionSelector;
