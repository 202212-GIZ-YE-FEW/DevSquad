import renderer from "react-test-renderer";

import Gmap from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Gmap />).toJSON();
    expect(tree).toMatchSnapshot();
});
