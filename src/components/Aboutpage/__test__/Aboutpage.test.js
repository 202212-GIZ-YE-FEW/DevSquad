import renderer from "react-test-renderer";

import Aboutpage from "../Aboutpage";

it("renders correctly", () => {
    const tree = renderer.create(<Aboutpage />).toJSON();
    expect(tree).toMatchSnapshot();
});
