const AquaRegularCard = (props) => {
  const { onClick, title, description } = props;
  return (
    <div>
      <div onClick={onClick} className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default AquaRegularCard;
