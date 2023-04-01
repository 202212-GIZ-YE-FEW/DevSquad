import renderer from "react-test-renderer";

import Getstartedbtn from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Getstartedbtn />).toJSON();
    expect(tree).toMatchSnapshot();
});
