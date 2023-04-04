import renderer from "react-test-renderer";

import Inputcomponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Inputcomponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
