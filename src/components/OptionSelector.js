const OptionSelector = ({
  children,
  errorMessage,
  options,
  handlerFunction,
  formData,
}) => {

  return (
    <div className="form-section">
      <p>{children}</p>
      <p className="form-error-msg">{errorMessage}</p>
      {options.map((option) => (
        <label key={option} className="radio-btn">
          {option}
          <input
              type="radio"
              checked={formData.value === option}
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
