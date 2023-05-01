import renderer from "react-test-renderer";

import LocationComponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<LocationComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
