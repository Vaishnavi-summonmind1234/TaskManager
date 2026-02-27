const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#111827",
    borderColor: "#374151",
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1f2937",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "#7c3aed"
      : "#1f2937",
    color: "white",
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#7c3aed",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
};