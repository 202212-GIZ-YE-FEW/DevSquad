import renderer from "react-test-renderer";

import ProfilePage from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<ProfilePage />).toJSON();
    expect(tree).toMatchSnapshot();
});
