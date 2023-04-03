import renderer from "react-test-renderer";

import Homepage from "..";

it("renders correctly", () => {
    const tree = renderer.create(<Homepage />).toJSON();
    expect(tree).toMatchSnapshot();
});
