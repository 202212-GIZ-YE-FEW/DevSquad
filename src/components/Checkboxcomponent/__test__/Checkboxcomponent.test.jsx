import renderer from "react-test-renderer";

import Checkboxcomponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Checkboxcomponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
