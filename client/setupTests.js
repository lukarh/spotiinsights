jest.mock('@material-ui/core/Slider', () => (props) => {
    const { id, name, min, max, onChange, testid } = props;
    return (
      <input
        data-testid={testid}
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  });