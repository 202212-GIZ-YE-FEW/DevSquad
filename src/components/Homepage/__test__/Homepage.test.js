import renderer from "react-test-renderer";

import Homepage from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Homepage />).toJSON();
    expect(tree).toMatchSnapshot();
});
