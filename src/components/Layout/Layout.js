import AquaCardLayover from "../cards/CardLayoutLayover";
import AquaNav from "./Header";

const AquaLayout = (props) => {
  return (
    <>
    <div className="nav-adjust container">
      <AquaNav />
      </div>
      <div className="container-fluid mb-1 mt-1">
        <AquaCardLayover>
          <div className="body-adjust">{props.children}</div>
        </AquaCardLayover>
      </div>
    </>
  );
};
export default AquaLayout;
