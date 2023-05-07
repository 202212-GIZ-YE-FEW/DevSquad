import renderer from "react-test-renderer";

import DialogBox from "..";

it("renders correctly", () => {
    const tree = renderer.create(<DialogBox />).toJSON();
    expect(tree).toMatchSnapshot();
});
