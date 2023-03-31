import renderer from "react-test-renderer";
import Getstartedbtn from "../Index";

it("renders correctly", () => {
    const tree = renderer.create(<Getstartedbtn />).toJSON();
    expect(tree).toMatchSnapshot();
});
