import renderer from "react-test-renderer";

import Hirosection from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Hirosection />).toJSON();
    expect(tree).toMatchSnapshot();
});
