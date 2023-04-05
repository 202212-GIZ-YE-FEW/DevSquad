import renderer from "react-test-renderer";

import Eventcard from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Eventcard />).toJSON();
    expect(tree).toMatchSnapshot();
});
