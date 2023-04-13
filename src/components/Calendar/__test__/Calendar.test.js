import renderer from "react-test-renderer";

import Calendar from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Calendar />).toJSON();
    expect(tree).toMatchSnapshot();
});
