import renderer from "react-test-renderer";

import Buttoncomponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Buttoncomponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
