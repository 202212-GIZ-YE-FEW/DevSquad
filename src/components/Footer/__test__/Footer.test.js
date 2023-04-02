import renderer from "react-test-renderer";

import Footer from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});
