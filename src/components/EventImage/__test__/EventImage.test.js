import renderer from "react-test-renderer";
import EventImage from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<EventImage />).toJSON();
    expect(tree).toMatchSnapshot();
});
