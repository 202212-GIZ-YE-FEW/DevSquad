import renderer from "react-test-renderer";
import Homepage from "../Index";

it("renders correctly", () => {
    const tree = renderer.create(<Homepage />).toJSON();
    expect(tree).toMatchSnapshot();
});
