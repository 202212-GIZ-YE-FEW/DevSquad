import renderer from "react-test-renderer";
import Hirosection from "../Index";

it("renders correctly", () => {
    const tree = renderer.create(<Hirosection />).toJSON();
    expect(tree).toMatchSnapshot();
});
