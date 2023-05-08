import renderer from "react-test-renderer";

import ScrollerTopcomponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<ScrollerTopcomponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
