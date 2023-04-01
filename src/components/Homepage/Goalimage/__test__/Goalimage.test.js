import renderer from "react-test-renderer";
import Goalimage from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Goalimage />).toJSON();
    expect(tree).toMatchSnapshot();
});
