import renderer from "react-test-renderer";

import Eventcreation from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Eventcreation />).toJSON();
    expect(tree).toMatchSnapshot();
});
