import renderer from "react-test-renderer";

import SignIn from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
});
