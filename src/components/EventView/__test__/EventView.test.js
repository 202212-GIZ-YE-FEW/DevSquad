import renderer from "react-test-renderer";

import EventView from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<EventView />).toJSON();
    expect(tree).toMatchSnapshot();
});
