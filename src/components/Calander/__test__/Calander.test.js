import renderer from "react-test-renderer";

import Calander from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Calander />).toJSON();
    expect(tree).toMatchSnapshot();
});
