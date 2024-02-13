const AquaPlaceholder = (props) => {
  const { type, name, size } = props;
  const styles = {
    fontSize: `${size}rem`,
  };
  return (
    <>
      <h3 className="text-muted" style={styles}>
        {type} : <span className="text-dark">{name}</span>
      </h3>
    </>
  );
};
export default AquaPlaceholder;
